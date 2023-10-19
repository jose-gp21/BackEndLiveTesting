const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
const productRouter = require('./routes/products')
const port = 3000

dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=>console.log('db connect')).catch((err) => console.log(err))

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use('/api/products', productRouter)

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))