import { Client } from "ecstar";
import * as dotenv from "dotenv";
dotenv.config();

const client = new Client({
    prefix: "!!",
    disableMentions: "everyone",
    owner: "465702500146610176"
});

client.login(process.env.TOKEN);