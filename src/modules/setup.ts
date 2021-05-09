import {existsSync as exists} from "fs";
import inquirer from "inquirer";

import {Config} from "../structures";
import Storage from "./storage";

const prompts = [
    {
        type: "password",
        name: "token",
        message: "What's your bot's token?",
        mask: true
    },
    {
        type: "input",
        name: "prefix",
        message: "What do you want your bot's prefix to be?",
        default: "n!"
    },
    {
        type: "input",
        name: "owner",
        message: "Enter the owner's user ID here."
    },
    {
        type: "input",
        name: "admins",
        message: "Enter a list of bot admins (by their IDs) separated by spaces."
    }
];

export default {
    async init() {
        while (!exists("data/config.json")) {
            const answers = await inquirer.prompt(prompts);
            Storage.open("data");
            Config.token = answers.token as string;
            Config.prefix = answers.prefix as string;
            Config.owner = answers.owner as string;
            const admins = answers.admins as string;
            Config.admins = admins !== "" ? admins.split(" ") : [];
            Config.save(false);
        }
    },

    async again() {
        console.error("It seems the token you provided is invalid.");

        const answers = await inquirer.prompt(prompts.slice(0, 1));
        Config.token = answers.token as string;
        Config.save(false);
        // eslint-disable-next-line no-process-exit
        process.exit();
    }
};
