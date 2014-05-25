var dnsserver = require('./dnsserver');

var server = dnsserver.createServer();
server.bind(5353, '127.0.0.1');

// Response.prototype.addRR = function(domain, qtype, qclass, ttl, rdata, authoritative) {}
server.on('request', function(req, res) {
  var question = req.question;
  console.log(question.name);

  if (question.type === 1 && question.class === 1) {
    // IN A query
    res.addRR(question.name, 1, 1, 3600, '184.106.231.91');
  } else {
    res.header.rcode = 3; // NXDOMAIN
  }

  res.send();
});

server.on('error', function(e) {
  throw e;
});
