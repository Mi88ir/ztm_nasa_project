const path = require('path');
const express = require('express');
const cors = require('cors');
const planetsRouter = require('./routes/planets.router');
const app = express();

app.use(cors({
    origin:'http://localhost:3000'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));
app.use(planetsRouter);

//enabling the build to run on same port as server
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
});

module.exports = app;