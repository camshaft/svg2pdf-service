/**
 * Module dependencies
 */
var express = require("express")
  , spawn = require('child_process').spawn;

var app = module.exports = express();

app.configure(function() {
  app.set("x-powered-by", false);

  app.configure("development", function() {
    app.use(express.logger("dev"));
  });

  app.use(express.static(__dirname+"/public"));
  app.use(app.router);
});

app.post("/", function(req, res, next) {
  var svg2pdf = spawn(__dirname+"/svg2pdf", ["-", "-o", "-"]);

  res.set("content-type", "application/pdf");

  req.pipe(svg2pdf.stdin);
  svg2pdf.stdout.pipe(res);

  svg2pdf.stderr.on('data', function(err) {
    console.error("" + err);
  });
});
