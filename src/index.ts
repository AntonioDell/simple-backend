import "reflect-metadata";
import { createConnection, TypeORMError } from "typeorm";
import { Team } from "./entity/Team";
import { Bet } from "./entity/Bet";
import { PostBet } from "./payloads/PostBet";
import express from "express";

const port = process.env.NODEJS_PORT || 8080;

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("A new season started!");
});

app.get("/bets", async (req, res) => {
  const bets = await Bet.find();
  res.status(200).json(bets);
});

app.delete("/bets/:id", async (req, res) => {
  await Bet.delete(req.params.id);
  res.status(200).send();
});

app.put("/bets", async (req, res) => {
  const postBet = req.body as PostBet;
  const team = await Team.findOne(postBet.teamId);
  if (!team) {
    res.status(400).send(`Team with id ${postBet.teamId} doesn't exist`);
    return;
  }
  let bet = new Bet();
  bet.amount = postBet.amount;
  bet.teamId = team.id;
  bet = await bet.save();
  res.status(200).send(bet);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

createConnection()
  .then(async (connection) => {
    (await Bet.find()).forEach((bet) => bet.remove());
    (await Team.find()).forEach((team) => team.remove());
    console.log("Creating dummy data");
    let team = new Team();
    team.name = "The Grizzly Growlers";
    team = await team.save();

    const bet = new Bet();
    bet.teamId = team.id;
    bet.amount = 100;
    await bet.save();
  })
  .catch((error) => console.log(error));
