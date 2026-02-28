class ConsoleTransport{
    log(entry){
        console.log(JSON.stringify(entry));
    }
}

module.exports = ConsoleTransport;