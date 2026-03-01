const createLogger = require("../src");

const logger = createLogger("MyApp");

logger.info("This is an info message");
logger.warn("This is a warning");
logger.error("DB connection failed");