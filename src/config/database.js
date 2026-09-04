const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");

async function connectDB(){

    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully");
        
    }
    catch(err){
        console.log("Database connection error");
        console.log(err);
        
    }
}

module.exports = connectDB;