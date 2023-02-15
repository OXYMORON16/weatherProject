const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    
    res.send('Hello World');
})




app.listen(3000, function(){
    console.log('Listening on port 3000');
})