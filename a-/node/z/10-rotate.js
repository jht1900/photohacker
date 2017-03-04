
var jimp = require("jimp");

var infile = '../z-in/IMG_8027-beads.jpg';
var outfile = '../z-out/IMG_8027-beads-out2.jpg';

function app() {
	var steps = [
		jimp.read(infile),
		jimp.loadFont(jimp.FONT_SANS_64_BLACK),
		jimp.loadFont(jimp.FONT_SANS_64_WHITE)
	];
	Promise.all(steps).then(function (result) {
		process(result[0], result[1], result[2]);
	}).catch(function (err) {
		console.log(err);
	});
}

function process(img, font1, font2) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log('img width='+width+' height='+height);
	var degrees = 90;
	var msg = ''+degrees;
	var x = width / 2;
	var y = height - 64;
	var resize = false;
	img.rotate(degrees, resize);
	img.print(font2, x, y, msg);
	img.print(font1, x+1, y+1, msg);
	img.write(outfile); // save
	console.log('open '+outfile);
}

app();
