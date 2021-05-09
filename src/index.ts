import path from "path";

import {Client, Permissions} from "discord.js";

import {launch} from "onion-lasers";

import "./modules/globals";
import "./modules/ready";
import setup from "./modules/setup";
import {Config} from "./structures";

export const client = new Client();

setup.init().then(() => {
    client.login(Config.token).catch(setup.again);
});

launch(client, path.join(__dirname, "commands"), {
    getPrefix: () => "n!",
    permissionLevels: [
        {
            name: "User",
            check: () => true
        },
        {
            name: "Moderator",
            check: (_user, member) =>
                Boolean(member) &&
                (member!.hasPermission(Permissions.FLAGS.MANAGE_ROLES) ||
                    member!.hasPermission(Permissions.FLAGS.MANAGE_MESSAGES) ||
                    member!.hasPermission(Permissions.FLAGS.KICK_MEMBERS) ||
                    member!.hasPermission(Permissions.FLAGS.BAN_MEMBERS))
        },
        {
            name: "Administrator",
            check: (_user, member) => Boolean(member) && member!.hasPermission(Permissions.FLAGS.ADMINISTRATOR)
        },
        {
            name: "Server Owner",
            check: (_user, member) => Boolean(member) && member!.guild.ownerID === member!.id
        },
        {
            name: "Bot Admin",
            check: (user) => Config.admins.includes(user.id)
        },
        {
            name: "Bot Owner",
            check: (user) => Config.owner === user.id
        }
    ]
});
