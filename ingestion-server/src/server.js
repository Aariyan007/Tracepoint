const express = require("express");
const validateLog = require("./validate");
const app = express();
const PORT = 4000;

app.use(express.json());

app.get('/health',(req,res)=>{
    res.json({status:"ok"});
})

app.post('/logs',(req,res)=>{
    const log = req.body;
    const error = validateLog(log);
    if(error){
        return res.status(400).json({error});
    }
    console.log("Accepted log:", log);
    res.status(200).json({message:"Log received"});
})



app.listen(PORT,()=>{
    console.log(`Log ingestion server running on port ${PORT}`);
})