
const moment = require("moment-timezone");

class Utils {
    static currentTime(timezone = "Africa/Cairo", format = "DD/MM/YYYY hh:mm:ss A") {
		return 	moment().tz(timezone).format(format);
	}

    static formatTimestamp(timestamp, timezone = "Africa/Cairo", format = "DD/MM/YYYY hh:mm:ss A") {
		return moment(timestamp).tz(timezone).format(format);
	}

    static errorsAsStrings(error) {
           return JSON.stringify(error, Object.getOwnPropertyNames(error))

        
    }
}

module.exports = Utils;