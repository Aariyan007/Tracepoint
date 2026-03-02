# TRACEPOINT

A hands-on learning project to build a production-grade logging system from scratch.

---

## Why this project exists

When you are just starting, `console.log()` feels like enough. But in a production environment, logging to standard output isn't enough because:

* **Logs get lost:** When a container crashes or a server restarts, stdout logs disappear.
* **Logs are unstructured:** Searching for specific errors in raw text strings is painfully slow.
* **Logs are scattered:** If you have ten microservices, you don't want to SSH into ten servers to find what happened.

`signal-log` teaches you how to build a system that generates **structured (JSON) logs**, transports them over the network, rate-limits the ingestion, and stores them centrally for easy querying.

---

## High-level architecture

The system is split into two main parts: the **Logger Library** (which sits inside your application) and the **Ingestion Server** (which collects and stores logs).

```text
[Your App] --> [Logger Library] --> (HTTP/File/Console)
                                           |
                                           v
                              [Ingestion Server]
                               (Validation & Rate Limiting)
                                           |
                                           v
                                   [JSONL Storage]
                                           |
                                           v
                                     [Query API]

```

---

## Project structure

* **`logger/`**: The client-side library your application uses.
* `src/index.js`: The main entry point.
* `src/levels.js`: Defines log severity (INFO, WARN, ERROR, etc.).
* `src/transports/`: Plugins to send logs to different destinations (File, HTTP, Console).


* **`ingestion-server/`**: The backend that receives and manages logs.
* `src/server.js`: The HTTP server handling requests.
* `src/validate.js`: Ensures incoming logs follow the required schema.
* `src/rateLimiter.js`: Protects the server from being overwhelmed (Token Bucket implementation).
* `src/storage.js`: Logic to append logs to JSONL files.



---

## How it works: A Request Lifecycle

1. **Instrumentation**: Your app calls `logger.error("Database connection failed")`.
2. **Structuring**: The `logger` adds a timestamp, log level, and process ID, turning it into a JSON object.
3. **Transporting**: The `http` transport sends this JSON to the Ingestion Server via a POST request.
4. **Ingestion**: The server checks the log against `validate.js` and applies `rateLimiter.js` logic to ensure the sender isn't spamming.
5. **Persistence**: The valid log is appended to a file in JSONL (JSON Lines) format.
6. **Retrieval**: You can query the stored logs via the API.

---

## Features

* **Structured Logging**: JSON format makes logs machine-readable.
* **Multiple Transports**: Write to console, write to a local file, or ship over HTTP.
* **Log Levels**: Organize by priority (DEBUG, INFO, WARN, ERROR).
* **Rate Limiting**: Protects your ingestion server using a Token Bucket algorithm.
* **Validation**: Ensures logs have required fields before storage.
* **Query API**: Fetch logs by service name, severity, and pagination support.

---

## How to run locally

### 1. Start the Ingestion Server

```bash
cd ingestion-server
npm install
npm start

```

*The server will start on `http://localhost:3000`.*

### 2. Run the Example Logger

```bash
cd logger
npm install
node example/app.js

```

*The app will automatically send logs to the ingestion server.*

---

## API Overview

### POST `/logs`

Send a log entry to the server.

* **Request Body**:
```json
{
  "service": "auth-service",
  "level": "error",
  "message": "Login failed",
  "timestamp": "2026-03-03T12:00:00Z"
}

```



### GET `/logs`

Fetch logs with filters.

* **Query Params**: `?service=auth-service&level=error&limit=10`

---

## What this project teaches

* **Middleware patterns**: How to handle incoming data with validation and rate limiting.
* **Streaming I/O**: Why appending to files (JSONL) is better than reading/writing whole files.
* **Transport logic**: How to decouple log generation from log delivery.
* **The "Token Bucket" Algorithm**: A classic way to handle rate limiting in production systems.

---

## Future improvements

This is a learning project, so it has room to grow. If you're looking for extra credit, consider implementing:

* **Async Queueing**: Currently, the logger might block the main thread. Implementing an in-memory queue would fix this.
* **Log Rotation**: The files will grow indefinitely. Implementing log rotation (deleting old logs) is essential.
* **Authentication**: Add API keys so only authorized services can send logs.
* **Real-time Dashboard**: Create a simple frontend to watch logs as they come in using WebSockets.
