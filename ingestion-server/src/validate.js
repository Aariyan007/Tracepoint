const VALID_LEVELS = ["ERROR","INFO","DEBUG","WARN"];

function validateLog(log){
    if(!log){
        return "Log Body Missing";
    }
    if(typeof log.time !== "string"){
        return "Invalid or Missing Time";
    }
    if(!VALID_LEVELS.includes(log.level)){
        return "Invalid Log Level";
    }
    if(typeof log.service !== "string"){
        return "Invalid or Missing Service Name";
    }
    if(typeof log.message !== "string"){
        return "Invalid or Missing Message";
    }
    return null;

}

module.exports = validateLog;