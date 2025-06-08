const express = require('express');
require('dotenv').config();
const ConnectDb = require('./utils/dbConnect')
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const chargerRoute = require('./routes/chargerRoute')
const port = process.env.PORT || 5000
ConnectDb();



app.use(cookieParser());
app.use(express.json());
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/api/user",userRouter);
app.use("/api/charger",chargerRoute);

app.listen(port,()=>{
    console.log(`server is running on localhost:${port}`);
    
})