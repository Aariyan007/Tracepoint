class ConsoleTransport {
    constructor(env) {
        this.env = env;
    }
    log(entry) {
        if (this.env === "production") {
            console.log(JSON.stringify(entry));
            return;
        }
        const color = {
            // ERROR : "\xb"
            ERROR: "\x1b[31m",
            WARN: "\x1b[33m",
            INFO: "\x1b[36m",
            DEBUG: "\x1b[90m"
        }[entry.level];

        console.log(
            `${color}[${entry.time}] ${entry.service} ${entry.level}: ${entry.message}\x1b[0m`,
            entry.userId ? `(userId=${entry.userId})` : ""
        );
    }
}

module.exports = ConsoleTransport;