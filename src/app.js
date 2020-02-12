const express = require('express');

const { getPlayer, getAllPlayers } = require("./player/get");

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/players', async (req, res) => {
  const players = await getAllPlayers();
  res.json(players.sort((a, b) => a.id - b.id));
});

app.get('/player/:id', async (req, res) => {
  const player = await getPlayer(parseInt(req.params.id));
  if (player)
    res.json(player);
  else
    res.sendStatus(404);
});

app.listen(PORT);
