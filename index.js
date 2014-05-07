var base32 = require('./lib/thirty-two')
var zlib = require('zlib')
var Buffer = require('buffer').Buffer

var decode = function (str) {
  var decoded = base32.decode(str);
  decoded = new Buffer(decoded, null);
  console.log(decoded);
  zlib.gunzip(decoded, function(err, res){
    console.log(res.toString());
  });
}

var Hopper = require('./lib/hopper').Hopper;

var hopper = new Hopper();

hopper.on('decode', function(buffer){
  zlib.gunzip(buffer, function(err, res){
    console.log(res.toString());
  });
});

var dnsQueries = [
  "0j63vnt1b1dvcvkkd437a3maormaz7rkgdhdcuvgjzlp4pe6cli5uguhfs2gdfezwj2vbnxfh3w4v4qtlwip7i56sittzqompx6ma2lvftvl67j5i6zcf5auogchsor2q36usj72hvrl6tkqo5dfqpx44jox4fncr36rjn7xf33tufnpnt65artb5wygfevv5ox6jwuudpdabaaaa.d.mdp.im"
  ,"j63vnt1a1d6fqqaaaaaaaaaaapwimc3wdeagimxzf4k5kyamweyw7oxlwty2e2xiuwfabwjqccgmk4u4uo6pvc62yf7rwfwp67h6nwczzzkzq6bvuelrcq3oueumyffuy64jiqidpliks7sivwqutqfnucwgbmdyud6tize4sddkuocfi4sgnmdo7nvnvmu564vgzxoyqsin6ix52ozqmb2ciyrbffmayb4f5df2zhkcthmmcvaiwb.d.mdp.im"
]

hopper.inbound(dnsQueries[0]);
hopper.inbound(dnsQueries[1]);


// decode("d6fqqaaaaaaaaaaapwimc3wdeagimxzf4k5kyamweyw7oxlwty2e2xiuwfabwjqccgmk4u4uo6pvc62yf7rwfwp67h6nwczzzkzq6bvuelrcq3oueumyffuy64jiqidpliks7sivwqutqfnucwgbmdyud6tize4sddkuocfi4sgnmdo7nvnvmu564vgzxoyqsin6ix52ozqmb2ciyrbffmayb4f5df2zhkcthmmcvaiwbdvcvkkd437a3maormaz7rkgdhdcuvgjzlp4pe6cli5uguhfs2gdfezwj2vbnxfh3w4v4qtlwip7i56sittzqompx6ma2lvftvl67j5i6zcf5auogchsor2q36usj72hvrl6tkqo5dfqpx44jox4fncr36rjn7xf33tufnpnt65artb5wygfevv5ox6jwuudpdabaaaa")
