import "./modules/globals";
import {Client, Permissions} from 'discord.js';
import path from 'path';

export const client = new Client();

import {launch} from 'onion-lasers';
import setup from './modules/setup';
import {Config} from './structures';

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
            // ADMIN //
            name: "Administrator",
            check: (_user, member) => Boolean(member) && member!.hasPermission(Permissions.FLAGS.ADMINISTRATOR)
        },
        {
            // OWNER //
            name: "Server Owner",
            check: (_user, member) => Boolean(member) && member!.guild.ownerID === member!.id
        },
        {
            // BOT_ADMIN //
            name: "Bot Admin",
            check: (user) => Config.admins.includes(user.id)
        },
        {
            // BOT_OWNER //
            name: "Bot Owner",
            check: (user) => Config.owner === user.id
        }
    ]
});

import "./modules/ready";