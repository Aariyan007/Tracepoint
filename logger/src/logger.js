const levels = require("./levels");
const config = require("./config");

class Logger {
    constructor(serviceName, transports = []) {
        this.serviceName = serviceName;
        this.transports = transports;
        this.level = levels[config.LOG_LEVEL];
    }
    log(levelName, message, meta = {}) {
        if (levels[levelName] < this.level) {
            return;
        }
        const entry = {
            time: new Date().toISOString(),
            service: this.serviceName,
            level: levelName,
            message,
            ...meta
        };
        for (const transport of this.transports) {
            transport.log(entry);
        }
    }
    info(msg, meta = {}) {
        this.log("info", msg, meta);
    }
    warn(msg, meta) {
        this.log("WARN", msg, meta);
    }

    error(msg, meta) {
        this.log("ERROR", msg, meta);
    }

    debug(msg, meta) {
        this.log("DEBUG", msg, meta);
    }
}

module.exports = Logger;