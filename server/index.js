const dotenv= require('dotenv')
const path  =require('path')
const cors = require('cors')
const express =require('express')
const connectDB = require('./src/config/connectFile')
const app = express()
const authRoutes = require('./src/routes/authRoutes');
const incomeRoutes = require('./src/routes/incomeRoutes');
const expenseRoutes = require('./src/routes/expenseRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');

dotenv.config()

app.use(cors({
    origin : process.env.CLIENT_URL || '*',
    methods : ["POST" ,"GET", "PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);




app.use(
  "/uploads",
  express.static(path.join(__dirname, "src/uploads"))
)


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