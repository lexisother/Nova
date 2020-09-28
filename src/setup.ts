import {existsSync as exists} from "fs";
import inquirer from "inquirer";
import Storage from "./core/storage";
import {Config} from "./core/structures";
import $, {setConsoleActivated} from "./core/lib";

// This file is called (or at least should be called) automatically as long as a config file doesn't exist yet.
// And that file won't be written until the data is successfully initialized.
const prompts = [{
	type: "password",
	name: "token",
	message: "What's your bot's token?",
	mask: true
}, {
	type: "input",
	name: "prefix",
	message: "What do you want your bot's prefix to be?",
	default: "n!"
}, {
	type: "input",
	name: "owner",
	message: "Enter the owner's user ID here."
}, {
	type: "input",
	name: "admins",
	message: "Enter a list of bot admins (by their IDs) separated by spaces."
}, {
	type: "input",
	name: "support",
	message: "Enter a list of bot troubleshooters (by their IDs) separated by spaces."
}];

export default {
	async init()
	{
		while(!exists("data/config.json"))
		{
			const answers = await inquirer.prompt(prompts);
			Storage.open("data");
			Config.token = answers.token as string;
			Config.prefix = answers.prefix as string;
			Config.owner = answers.owner as string;
			const admins = (answers.admins as string);
			Config.admins = admins !== "" ? admins.split(" ") : [];
			const support = (answers.support as string);
			Config.support = support !== "" ? support.split(" ") : [];
			Config.save(false);
		}
	},
	/** Prompt the user to set their token again. */
	async again()
	{
		$.error("It seems that the token you provided is invalid.");
		setConsoleActivated(false);
		const answers = await inquirer.prompt(prompts.slice(0, 1));
		Config.token = answers.token as string;
		Config.save(false);
		process.exit();
	}
};
