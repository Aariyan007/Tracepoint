class RateLimiter{
    constructor(limit,refillPerSecond){
        this.limit = limit;
        this.refillPerSecond = refillPerSecond;
        this.tokens = limit;
        this.lastRefill = Date.now();
    }
    allow(){
        const now = Date.now();
        const elapsed = (now - this.lastRefill)/1000;
        this.tokens = Math.min(this.limit,this.tokens + elapsed * this.refillPerSecond);
        this.lastRefill = now;
        if(this.tokens >= 1){
            this.tokens -= 1;
            return true;
        }
        return false;
    }
}
module.exports = RateLimiter;