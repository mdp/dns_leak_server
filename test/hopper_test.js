var Hopper = require('../lib/hopper').Hopper;
var zlib = require('zlib');

var hopper = new Hopper("d.mdp.im");

hopper.on('decode', function(buffer){
    zlib.gunzip(buffer, function(err, res){
          console.log(res.toString());
    });
});

var dnsQueries = [
"j63vnt1a.d6fqqaaaaaaaaaaapwimc3wdeagimxzf4k5kyamweyw.7oxlwty2e2xiuwfabwjqccgmk4u4uo6pvc62yf7rwfwp67h6nwczzzkzq6bvuel.rcq3oueumyffuy64jiqidpliks7sivwqutqfnucwgbmdyud6tize4sddkuocfi4.sgnmdo7nvnvmu564vgzxoyqsin6ix52ozqmb2ciyrbffmayb4f5df2zhkcthmmc.d.mdp.im"
, "j63vnt0b.vaiwbdvcvkkd437.a3maormaz7rkgdhdcuvgjzlp4pe6cli5uguhfs2gdfezwj2vbnxfh3w4v4qtlwi.p7i56sittzqompx6ma2lvftvl67j5i6zcf5auogchsor2q36usj72hvrl6tkqo5.dfqpx44jox4fncr36rjn7xf33tufnpnt65artb5wygfevv5ox6jwuudpdabaaaa.d.mdp.im"
]

hopper.add(dnsQueries[0]);
hopper.add(dnsQueries[1]);


