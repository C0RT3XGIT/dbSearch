const mongoose = require('mongoose');
const routes = require('./routes/api');
const morgan = require('morgan');
const express = require('express')
const app = express()
const PORT = 8080
const path = require('path')
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err);
    }
}
connectDB();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))


const changeName = () => {
    mongoose.connection.collection("importData").rename("importdata");
    console.log('Name changed')
}    
    
    
app.use(express.json())
app.use(morgan('tiny'))
app.use('/api', routes);

app.listen(process.env.PORT, console.log(`Server is starting at ${PORT}`))