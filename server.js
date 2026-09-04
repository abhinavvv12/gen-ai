const app = require('./src/app');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database')

dotenv.config();
connectDB();

app.listen(3000,()=>{
    console.log("Server Started at port 3000");
});

