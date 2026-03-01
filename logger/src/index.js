const Logger = require("./logger");
const ConsoleTransport = require("./transports/console");
const FileTransport = require("./transports/file");
const config = require("./config");

module.exports =(serviceName) =>{
    const transports = [
        new ConsoleTransport(config.NODE_ENV),
        // new FileTransport("app.log")
    ];
    if(config.NODE_ENV === "production"){
        transports.push(new FileTransport("app.log"));
    }
    return new Logger(serviceName, transports);
}

