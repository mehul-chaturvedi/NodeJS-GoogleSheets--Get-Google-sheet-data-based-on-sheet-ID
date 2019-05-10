var express = require('express');
let authentication = require('./authentication');
var router = express.Router();
var {google} = require('googleapis')


router.get('getdata/:id', (req, res)=>{
    let gID = req.params.id;

      
    authentication.authenticate().then((auth)=>{
        getData(auth, gID);
    });
       
      

});

router.put('writedata/:id', (req, res)=>{
    let gID = req.params.id;

    authentication.authenticate().then((auth=>{
        appendData(auth, gID);
    }))
})

function getData(auth, gID) {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: gID,
      range: 'A1:J', //Change Sheet1 if your worksheet's name is something else
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      } 
      var rows = response.data.values;
      if (rows.length === 0) {
        console.log('No data found.');
      } else {
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          console.log(row.join(", "));
        }
      }
    });
  }
   
  

module.exports = router;