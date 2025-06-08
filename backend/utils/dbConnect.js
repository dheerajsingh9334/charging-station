const mongoose = require('mongoose');
const ConnectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected Successfully');
        
    } catch (error) {
        console.log(`error to connect to the Db`,error.message);
        process.exit(1);
        
    }
}
module.exports = ConnectDb;