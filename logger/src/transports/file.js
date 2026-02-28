const fs = require("fs");
const path = require("path");

class FileTransport {
    constructor(filename = "app/log"){
        this.logFile = path.join(process.cwd(),filename);
    }
    log(entry){
        fs.appendFileSync(this.logFile,JSON.stringify(entry) + "\n");
    }
}

module.exports = FileTransport;