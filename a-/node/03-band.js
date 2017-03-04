
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/03-band.jpg';

// Draw one band based on color in center of photo
function phack_img(img) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	var cwidth = width;
	var cheight = 64;
	var x = width/2;
	var y = height/2;
	var pix = img.getPixelColor(x, y);
	console.log('x='+x+' y='+y+' pix='+pix.toString(16))
	var cimg = new jimp(cwidth, cheight, pix);
	img.blit( cimg, 0, y);

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
