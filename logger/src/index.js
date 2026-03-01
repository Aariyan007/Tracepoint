const Logger = require("./logger");
const ConsoleTransport = require("./transports/console");
const FileTransport = require("./transports/file");
const HttpTransport = require("./transports/http");
const config = require("./config");

module.exports =(serviceName) =>{
    const transports = [
        new ConsoleTransport(config.NODE_ENV),
        // new FileTransport("app.log")
    ];
    if(config.NODE_ENV === "production"){
        transports.push(new FileTransport("app.log"),new HttpTransport({
            host:"localhost",
            port:4000,
            path:'/logs'
        }));
    }
    return new Logger(serviceName, transports);
}

