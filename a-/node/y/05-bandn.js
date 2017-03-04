
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/04-bandn.jpg';

// Draw a number of bans of color selected from photo
function phack_img(img) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	var cwidth = width;
	var cheight = 16;
	var cimg;
	var pix;
	var x = 0;
	var y = 0;
	for (; y < height; y += cheight*2) {
		pix = img.getPixelColor(x+width/2, y);
		console.log('x='+x+' y='+y+' pix='+pix.toString(16))
		cimg = new jimp(cwidth, cheight, pix);
		img.blit( cimg, x, y);
	}

	phack_write(img);
	console.log('open '+outfile);
}

function phack_run() {
	jimp.read(infile, function (err, img) {
		if (err) throw err;
		phack_img(img);
	});
}
function phack_write(img) {
	img.write(outfile, function (err) { if (err) throw err; });
}
phack_run();
