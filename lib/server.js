var util = require("util");
var EventEmitter = require("events").EventEmitter;
var dnsServer = require('./dnsserver')

var Server = function() {
  var self = this;
  var server = dnsServer.createServer();

  this.listen = function(port, addr) {
    console.log("Binding to port " + port);
    server.bind(port, addr);
  }

  // Response.prototype.addRR = function(domain, qtype, qclass, ttl, rdata, authoritative) {}
  server.on('request', function(req, res) {
    var question = req.question;
    if (question.type === 1 && question.class === 1) {
      // IN A query
      res.addRR(question.name, 1, 1, 3600, '8.8.8.8');
      self.emit('request', question.name);
    } else {
      res.header.rcode = 3; // NXDOMAIN
    }

    res.send();
  });

  server.on('error', function(e) {
    throw e;
  });
}
util.inherits(Server, EventEmitter);

exports.createServer = function() {
  return new Server();
}
