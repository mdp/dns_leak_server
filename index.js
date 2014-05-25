var dnsServer = require('./lib/server')
var EventEmitter = require("events").EventEmitter;
var Hopper = require('./lib/hopper').Hopper
var util = require("util");
var zlib = require('zlib')

var DnsLeakServer = exports.DnsLeakServer = function(domain) {
  var self = this;
  var hopper = new Hopper(domain);
  var server = dnsServer.createServer();
  server.on('request', onRequest);
  hopper.on('decode', onDecoded);
  this.listen = function(port, addr) {
    server.listen(port||5353, addr);
  }

  function onRequest(domain) {
    try {
      hopper.add(domain);
    } catch (e) {
      console.log(e);
    }
  }

  function onDecoded(decoded) {
    zlib.gunzip(decoded, function(err, res){
      if (err) {
        console.log(err);
        self.emit('err', err);
        return false;
      }
      self.emit('message', res.toString());
    });
  }

}
util.inherits(DnsLeakServer, EventEmitter);
