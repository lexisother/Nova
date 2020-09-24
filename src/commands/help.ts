import { Message } from "discord.js";
import { Client, Command } from "ecstar";

module.exports = class extends Command {
  constructor(client: Client) {
    super(client, {
        name: "help"
    });
  }

  run(message: Message) {
    message.channel.send("huehue")
  }
};