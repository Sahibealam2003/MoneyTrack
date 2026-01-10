const dotenv= require('dotenv')
const path  =require('path')
const cors = require('cors')
const express =require('express')
const connectDB = require('./src/config/connectFile')
const app = express()
const {route : authRoutes} = require('./src/routes/authRoutes')
dotenv.config()

app.use(cors({
    origin : process.env.CLIENT_URL || '*',
    methods : ["POST" ,"GET", "PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())


app.use('/api/v1/auth',authRoutes)



const  PORT = process.env.PORT || 8000
const serverStart = async()=>{
    try {
        await connectDB()
        app.listen(PORT,()=>{
            console.log("Server is Running on PORT " + PORT);
        })
    } catch (error) {
        console.log("Server is not runnig due to DB not connect");
        
    }
}

serverStart()