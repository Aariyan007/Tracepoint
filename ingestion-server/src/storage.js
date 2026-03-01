const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "..", "logs");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

function storeLog(log) {
  const date = new Date(log.time).toISOString().split("T")[0];
  const filePath = path.join(LOG_DIR, `${date}.log`);

  fs.appendFileSync(
    filePath,
    JSON.stringify(log) + "\n"
  );
}

module.exports = storeLog;