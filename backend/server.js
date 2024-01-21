const agenda = require("./src/Agenda");
const Utils = require("./src/utils");
const WhatsApp = require("./src/WhatsApp");
require("dotenv").config();
let app = new WhatsApp();
agenda.define("WhatsAppStickerMakerBot", async (job, done) => {
	try {
		await app.CheckClientStatus();
		done();
	} catch (e) {
		process.exit(1);
	}
});

agenda.on("ready", async () => {
	await agenda.every("1 minutes", "WhatsAppStickerMakerBot");
	await agenda.start();
});

agenda.on("fail", (err) => {
	const Logger = require("./src/Logger");
	const Logs = new Logger();
	Logs.sendAlert(
		`❌ WhatsAppStickerMakerBot \n ${Utils.errorsAsStrings(
			err
		)} \n ${Utils.currentTime()}`
	);
	process.exit(1);
});
