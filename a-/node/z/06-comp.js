
var jimp = require("jimp");

var infile1 = '../z-in/0colorwheel.png';
var infile2 = '../z-in/0render.png';
var outfile = '../z-out/03-comp.png'
function app() {
	var p1 = jimp.read(infile1);
	var p2 = jimp.read(infile2);
	Promise.all([p1, p2]).then(function (images) {
		var backimg = images[0];
		var foreimg = images[1];
		backimg.composite( foreimg, 512, 512).write( outfile );
		console.log('open '+outfile)
	}).catch(function (err) {
		console.log(err);
	});
}

app();
