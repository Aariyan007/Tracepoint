const express = require("express");
const validateLog = require("./validate");
const RateLimiter = require("./rateLimiter");
const storeLog = require("./storage");
const readLogs = require("./readLogs");
const app = express();
const PORT = 4000;

app.use(express.json());

const limiters = new Map();
const Limit = 60;
const RefillRate = 1;

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
})

app.post('/logs', (req, res) => {
    const log = req.body;
    const error = validateLog(log);
    if (error) {
        return res.status(400).json({ error });
    }
    const service = log.service;
    if (!limiters.has(service)) {
        limiters.set(service, new RateLimiter(Limit, RefillRate));

    }
    const limiter = limiters.get(service);
    if (!limiter.allow()) {
        return res.status(429).json({ error: "Rate limit exceeded" });
    }
    // console.log("Accepted log:", log);
    storeLog(log);
    res.status(200).json({ message: "Log received" });
})
app.get("/logs", async (req, res) => {
    const {
        service,
        level,
        from,
        to,
        limit,
        offset
    } = req.query;

    const logs = await readLogs({
        service,
        level,
        from: from ? Number(from) : null,
        to: to ? Number(to) : null,
        limit: limit ? Number(limit) : 50,
        offset: offset ? Number(offset) : 0
    });

    res.json(logs);
});



app.listen(PORT, () => {
    console.log(`Log ingestion server running on port ${PORT}`);
})