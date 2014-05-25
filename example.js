var DnsLeakServer = require('./index').DnsLeakServer

var server = new DnsLeakServer("d.mdp.im")
server.listen(3000, "0.0.0.0");

server.on('message', function(msg) {
  console.log(msg);
})
