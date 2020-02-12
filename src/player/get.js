const NodeCache = require("node-cache");

const download = require("../download/download");

const dataCache = new NodeCache({
  stdTTL: 60,
});

const source = process.env.DATA_SOURCE || "https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json";

async function getRemoteData() {
  const data = await download(source);
  return JSON.parse(data);
}

async function getCachedPlayer(id) {
  let out;

  if (process.env.USE_CACHE)
    out = dataCache.get(id);
  if (!out) {
    out = (await getRemoteData(id)).players.find(x => x.id === id);
  }
  if (process.env.USE_CACHE)
    dataCache.set(id, out);
  return out;
}

async function getAllPlayers() {
  const data = await getRemoteData();
  return data.players;
}

module.exports = {
  getPlayer: getCachedPlayer,
  getAllPlayers,
};
