
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/02-color.jpg';

// Draw to color bands across input photo
function phack_img(img) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log(infile+' width='+width+' height='+height);
	var cwidth = width;
	var cheight = 64;
	var cimg = new jimp(cwidth, cheight, 0xFF0000FF); // Red band
	img.blit( cimg, 0, 0);
	cimg = new jimp(cwidth, cheight, 0x00FF00FF); // Green band
	img.blit( cimg, 0, cheight*2);
	cimg = new jimp(cwidth, cheight, 0x0000FFFF); // Blue band
	img.blit( cimg, 0, cheight*4);

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
