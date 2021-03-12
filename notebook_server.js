//345678901234567890123456789012345678901234567890123456789012345678901234567890
////////////////////////////// SET UP and utils /////////////////////////////////
const express = require('express')
const port = process.argv[2] || 2223;
const app = express()
app.use(express.static('public'))

////////////////////////////// LOGIC ///////////////////////////////////////////


app.get('/', function (req, res) {
  console.log("notebook.html requested")
  res.sendFile('notebook.html', { root: __dirname })
})


////////////////////////////// MAIN ////////////////////////////////////////////

const server = app.listen(port, function () {
  console.log(`Notebook running at localhost:${port}/`)
  console.log('Remember to run node server.js also')
});
