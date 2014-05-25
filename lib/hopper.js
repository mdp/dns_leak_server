// Should work as follows
// Toss in a segment of a dns query.
// Should parse the correct bits out
// Buckets the content in order recieved
// Emits received message when it's complete
// Periodically garbage collects incomplete requests
//

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var thirtyTwo = require('./thirty-two');

var GC_MAX_COUNT = 20; // Check every X Counts
var GC_MAX_AGE = 5 * (60 * 1000); // 5 minutes max age
var BASE_32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function decodeIntBase32(str) {
  var base = BASE_32_CHARS.length;
  var num = 0;
  for (var i=0; i < str.length; i++) {
    var chr = str[i];
    num *= base;
    num += BASE_32_CHARS.toLowerCase().indexOf(chr.toLowerCase());
  }
  return num;
}

function nonEmptyLength(arr) {
  return arr.filter(function(x){ return true }).length;
}

var Hopper = exports.Hopper = function(rootDomain, options) {
  // Obj[uuid] = {ts: date, contents = [], length = 0}
  var buffer = {};
  var gcCounter = 0;

  function add(id, order, content, end) {
    if (!buffer.hasOwnProperty(id)) {
      buffer[id] = {};
      buffer[id].length = null;
      buffer[id].contents = [];
    }
    buffer[id].contents[order] = content;
    buffer[id].ts = Date.now();
    if (end) {
      buffer[id].length = order + 1;
    }
    return checkComplete(id);
  }

  function checkComplete(id) {
    var item = buffer[id];
    if (item && item.length === nonEmptyLength(item.contents)) {
      var content = item.contents.join('');
      return thirtyTwo.decode(content);
    }
    return false;
  }

  function callGC() {
    if (gcCounter >= GC_MAX_COUNT) {
      gcCounter = 0;
      // Loop and check each item for garbage collection
      for (var id in buffer) {
        // important check that this is objects own property 
        // not from prototype prop inherited
        if(buffer.hasOwnProperty(id)){
          var item = buffer[id];
          if (item.ts + GC_MAX_AGE < Date.now()) {
            delete buffer[id];
          }
        }
      }
    }
  }

  // Should parse an incoming dns address
  // Ex. uuid.order.data.data.data1.d.test.com
  this.parse = function(domain){
    domain = domain.replace("." + rootDomain, "");
    var end = false;
    var d = domain.split('.');
    if (d[0].indexOf('0') >= 0) {
      end = true;
    }
    var header = d.shift();
    header = end ? header.split('0') : header.split('1');
    if (header.length < 2) {return false; }
    var uuid = header.shift();
    var order = decodeIntBase32(header.shift());
    var content = d.join("");
    if (uuid && content) {
      return {uuid:uuid, order:order, content:content, end:end};
    }
    return false;
  }

  this.add = function(dns) {
    var r = this.parse(dns)
    if (r) {
      r = add(r.uuid, r.order, r.content, r.end);
    }
    if (r) {
      this.emit('decode', r)
    }
    callGC();
  }
}

util.inherits(exports.Hopper, EventEmitter);
