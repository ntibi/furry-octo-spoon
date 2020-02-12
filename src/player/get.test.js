const { getPlayer, getAllPlayers } = require('./get');

const download = require("../download/download");
jest.mock("../download/download");

describe("getPlayer", () => {
  test("should return the right data", async () => {
    const goodPlayer = {
      id: 1,
      firstname: "nicolas",
      lastname: "tibi",
    }
    const badPlayer = {
      id: 2,
      firstname: "bad",
      lastname: "baaaad",
    }
    const mockedData = {
      players: [
        goodPlayer,
        badPlayer,
      ]
    }
    download.mockResolvedValue(JSON.stringify(mockedData));

    expect(await getPlayer(1)).toEqual(goodPlayer);
    expect(await getPlayer(3)).toBe(undefined);
  });
})

describe("getAllPlayers", () => {
  test("should return all the players data", async () => {
    const players = [{
      id: 2,
      firstname: "nicolas",
      lastname: "tibi",
    }, {
      id: 1,
      firstname: "bad",
      lastname: "baaaad",
    }]
    const mockedData = {
      players,
    }
    download.mockResolvedValue(JSON.stringify(mockedData));

    expect(await getAllPlayers()).toEqual(players);
  });
})
