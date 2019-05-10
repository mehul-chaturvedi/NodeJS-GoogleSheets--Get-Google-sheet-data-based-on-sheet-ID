var express = require('express');
var googleSheetController = require('./googleSheetController');
var app = express();

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('listening to port: ', port);
})

app.use('/googlesheetID', googleSheetController);

module.exports = app;