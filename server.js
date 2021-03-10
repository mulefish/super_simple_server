//345678901234567890123456789012345678901234567890123456789012345678901234567890
////////////////////////////// SET UP and utils /////////////////////////////////
const express = require('express')
const bodyParser = require("body-parser")
const stack = require('callsite');
const fs = require('fs');
const cors = require('cors')
const port = process.argv[2] || 3030;
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
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
const app = express()
const configure = () => {
  app.use(bodyParser.urlencoded({ extended: false }))
  //app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors())
  // app.use(express.bodyParser());
  // app.use(express.cookieParser());
  // app.use(express.session({ secret: 'super zoom' }));
  // app.use(express.methodOverride());
  app.use(allowCrossDomain);
  // app.use(app.router);
  // app.use(express.static(__dirname + '/public'));
}
configure()

function log(msg) {
  console.log("\t" + msg)
}
function showHit() {
  const everything = stack()
  const caller = everything[1]
  const line = caller.getLineNumber()
  const func = caller.getFunctionName() || 'anonymous'
  const file = caller.getFileName()
  const metainfo = `Hit ${line}, '${func}', ${file}`
  console.log(metainfo)
}

function error(msg) {
  const everything = stack()
  const caller = everything[1]
  const line = caller.getLineNumber()
  const func = caller.getFunctionName() || 'anonymous'
  const file = caller.getFileName()
  const metainfo = `*** Boom! ${line}, '${func}', ${file}`
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


app.post('/echo_get', function (req, res) {
  showHit()
  const auth = req.headers.authorization
  const everything = {
    ...req.body,
    auth
  }
  res.send(everything);
});

app.post('/post_retrievePdf', function (req, res) {
  showHit()

  const auth = req.headers.authorization
  const loanId = req.body["loanId"]

  console.log("Fake auth " + auth + "    loanid " + loanId)

  res.writeHead(200, { "Content-Type": "application/pdf" });
  fs.readFile('sample.pdf', (boom, data) => {
    if (boom) {
      res.send(boom)
    } else {
      res.write(data);
      res.end();
    }
  });
});

app.get('/get_retrievePdf', function (req, res) {
  showHit()
  res.writeHead(200, { "Content-Type": "application/pdf" });
  fs.readFile('sample.pdf', (boom, data) => {
    if (boom) {
      res.send(boom)
    } else {
      res.write(data);
      res.end();
    }
  });
});

app.post('/post_retrievePdf', function (req, res) {
  showHit()
  res.writeHead(200, { "Content-Type": "application/pdf" });
  fs.readFile('sample.pdf', (boom, data) => {
    if (boom) {
      res.send(boom)
    } else {
      res.write(data);
      res.end();
    }
  });
});



app.post('/echo_post', function (req, res) {
  showHit()
  const auth = req.headers.authorization
  const everything = {
    ...req.body,
    auth
  }
  console.log(JSON.stringify(everything, null, 2))
  res.send(everything);
});

app.get('/', function (req, res) {
  showHit()
  //1:  __dirname = allow relative paths ( relative to where server.js is )
  //2: the {root: } is to prevent someone from sending tricksy paths such as
  // vv../../../my-secrets/importantfile.txt
  res.sendFile('index.html', { root: __dirname })
})


app.get('/pdf', function (req, res) {
  showHit()
  //1:  __dirname = allow relative paths ( relative to where server.js is )
  //2: the {root: } is to prevent someone from sending tricksy paths such as
  // vv../../../my-secrets/importantfile.txt
  res.sendFile('other_server.html', { root: __dirname })
})


app.get('/traditionalGet', function (req, res) {
  showHit()
  const a = req.query.param1
  const b = req.query.param2
  const c = `${a}<br/>${b}`
  const d = template.replace("CONTENT_WILL_GO_HERE", c)
  res.send(d)
});

app.post('/traditionalPostForm', function (req, res) {
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
