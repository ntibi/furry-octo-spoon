const request = require("supertest")

const app = require("./app");
let server

const get = require("./player/get");
jest.mock("./player/get");

beforeEach(async () => {
  server = await app.listen(3000);
  global.agent = request.agent(server);
});

afterEach(async () => {
  await server.close();
});

describe("/players", () => {
  test("should return the ordered players", async () => {
    const mockedPlayers = [{
        id: 2,
        name: "player2"
      }, {
        id: 1,
        name: "player1"
      }]
    const orderedMockedPlayers = [{
        id: 1,
        name: "player1"
      }, {
        id: 2,
        name: "player2"
      }]
    get.getAllPlayers.mockResolvedValue(mockedPlayers);

    const res = await global.agent.get("/players");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(orderedMockedPlayers);
  });
})

describe("/player/:id", () => {
  test("should return the right player", async () => {
    const mockedPlayer = {
      id: 1,
      name: "player1"
    }
    get.getPlayer.mockResolvedValue(mockedPlayer);

    const res = await global.agent.get("/player/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockedPlayer);
  });

  test("should 404 if no player is found", async () => {
    get.getPlayer.mockResolvedValue(undefined);

    const res = await global.agent.get("/player/1");
    expect(res.statusCode).toBe(404);
  });
})
