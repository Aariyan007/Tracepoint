const fs = require("fs");
const path = require("path");
const readline = require("readline");

const LOG_DIR = path.join(__dirname, "..", "logs");

async function readLogs({ service, level, from, to, limit = 50, offset = 0 }) {
  const files = fs.readdirSync(LOG_DIR).sort().reverse();

  const results = [];
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(LOG_DIR, file);

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      const log = JSON.parse(line);

      if (service && log.service !== service) continue;
      if (level && log.level !== level) continue;

      const time = new Date(log.time).getTime();
      if (from && time < from) continue;
      if (to && time > to) continue;

      if (skipped < offset) {
        skipped++;
        continue;
      }

      results.push(log);
      if (results.length >= limit) {
        return results;
      }
    }
  }

  return results;
}

module.exports = readLogs;