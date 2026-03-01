const http = require("http");

class HttpTransport {
    constructor({ host, port, path }) {
        this.options = {
            hostname: host,
            port,
            path,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };
    }

    log(entry) {
        const req = http.request(this.options, (res) => {
        });

        req.on("error", () => {
        });

        req.write(JSON.stringify(entry));
        req.end();
    }
}

module.exports = HttpTransport;