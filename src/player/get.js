const download = require("../download/download");

const source = process.env.DATA_SOURCE || "https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json";

async function getRemoteData() {
  const data = await download(source);
  return JSON.parse(data);
}

async function getPlayer(id) {
  return (await getRemoteData(id)).players.find(x => x.id === id);
}

async function getAllPlayers() {
  const data = await getRemoteData();
  return data.players;
}

module.exports = {
  getPlayer,
  getAllPlayers,
};
