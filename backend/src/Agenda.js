const { Agenda } = require("@hokify/agenda");


const agenda = new Agenda({ db: { address: process.env.MONGO_URL,collection:"Agenda",  } }).maxConcurrency(1);

module.exports = agenda;