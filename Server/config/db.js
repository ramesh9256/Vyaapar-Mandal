const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to db");
        
    } catch (error) {
        console.log("error in db connection" , error);
        
    }
}

module.exports = connectDb