
const mongoose = require("mongoose");
const fs = require('fs');
const importMovies  = require("./src/controllers/controller");
const MONGOURI =process.env.MONGO_URI;

const InitiateMongoServer = async()=>{
    try{
        await mongoose.connect(MONGOURI);
    
    console.log("connected to DB");
    
    }catch(e){
        console.log(e);
        throw(e);
        }
    };

    module.exports= InitiateMongoServer;

