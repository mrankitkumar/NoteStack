const connectTOMongo=require('./db');
const express=require("express");
const cors = require('cors')
const app = express()

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(express.json);
app.use(bodyparser.json());
const port=3001;

// connect to frontent to api
app.use(cors());



//Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get("/",function(req,res)
{
    res.send("hellow world");
})
app.listen(port,()=>{
    console.log(`NoteStack app is RUNNING AT ${port}`);
})