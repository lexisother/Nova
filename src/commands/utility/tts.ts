const discordTTS = require("discord-tts");
import Command from '../../core/command';
import {CommonLibrary} from '../../core/lib';
export default new Command({
	description: "Let the bot speak in a voice channel.",
	endpoint: false,
	usage: '<text>',
	async run($: CommonLibrary): Promise<any> {
		const voiceChannel = $.member?.voice.channel;
		if (!voiceChannel) return $.channel.send("You are not in a voice channel!");
		else if ($.args.join(" ").length > 200) return $.channel.send("Message exceeds 200 characters!");
		else
		voiceChannel?.join().then(connection => {
			const stream = discordTTS.getVoiceStream($.args.join(" "));
			const dispatcher = connection.play(stream);
			dispatcher.on("finish", () => voiceChannel.leave())
		})
	}
});