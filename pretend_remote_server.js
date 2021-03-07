//345678901234567890123456789012345678901234567890123456789012345678901234567890
////////////////////////////// SET UP and utils /////////////////////////////////
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const stack = require('callsite');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }))

const port = 2222;
const home = `http://localhost:${port}`
let template = `<html<head>
    <link rel="icon" href="data:,">
    <meta charset="utf-8" /></head>
    <body>
    <a href="${home}">${home}</a><hr/>
    CONTENT_WILL_GO_HERE
    </body>
    </html>
`
function log(msg) {
  console.log("\t" + msg)
}
function showHit() {
  const everything = stack()
  const caller = everything[1]
  const metainfo = "REMOTE: hit line: " + caller.getLineNumber() + " in File: " + caller.getFileName()
  console.log(metainfo)
}

function error(msg) {
  const everything = stack()
  const caller = everything[1]
  const metainfo = "REMOTE: *** Boom! Line: " + caller.getLineNumber() + " in File: " + caller.getFileName()
  console.log(metainfo + "\n" + msg)
  return metainfo

  // stack().forEach(function (site) {
  //   console.log('  \033[36m%s\033[90m in %s:%d\033[0m'
  //     , site.getFunctionName() || 'anonymous'
  //     , site.getFileName()
  //     , site.getLineNumber());
  // });
  // console.log();
}

////////////////////////////// LOGIC ///////////////////////////////////////////


app.get('/', function (req, res) {
  showHit()

  //1:  __dirname = allow relative paths ( relative to where server.js is )
  //2: the {root: } is to prevent someone from sending tricksy paths such as
  // vv../../../my-secrets/importantfile.txt
  //
  // 
  res.sendFile('other_server.html', { root: __dirname })
})

app.get('/traditionalGet', function (req, res) {
  showHit()
  const a = req.query.param1
  const b = req.query.param2
  const c = `${a}<br/>${b}`
  const d = template.replace("CONTENT_WILL_GO_HERE", c)
  res.send(d)
})

app.post('/traditionalPost', function (req, res) {
  showHit()
  const a = req.body.param1
  const b = req.body.param2
  const c = `${a}<br/>${b}`
  const d = template.replace("CONTENT_WILL_GO_HERE", c)
  res.send(d)
});


app.get('/get_retrievePdf', function (req, res) {
  showHit()
  res.writeHead(200, { "Content-Type": "application/pdf" });
  fs.readFile('sample.pdf', (boom, data) => {
    if (boom) {
      const metainfo = error(boom)
      boom += "<br/>" + metainfo
      const x = template.replace("CONTENT_WILL_GO_HERE", boom)
      res.send(x)
    } else {
      res.write(data);
      res.end();
    }
  });
});

////////////////////////////// MAIN ////////////////////////////////////////////

const server = app.listen(port, function () {
  log(`running at localhost:${port}/`)
});