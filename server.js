var DnsLeakServer = require('./index').DnsLeakServer

var server = new DnsLeakServer(process.env['NS'])
server.listen(process.env['PORT'] || 5353);

server.on('message', function(msg) {
  // Do more later here
  console.log(msg);
})
