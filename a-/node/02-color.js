
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/02-color.jpg';

function photohack_img(img) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log(infile+' img width='+width+' height='+height);

	// Red band
	var cwidth = width;
	var cheight = 64;
	var cimg = new jimp(cwidth, cheight, 0xFF0000FF);
	img.blit( cimg, 0, 0);

	// Green band
	cimg = new jimp(cwidth, cheight, 0x00FF00FF);
	img.blit( cimg, 0, cheight*2);

	img.write(outfile);
	console.log('open '+outfile);
}

function photohack() {
	jimp.read(infile).then(function (img) {
		photohack_img(img);
	}).catch(function (err) {
		console.log(err);
	});
}

photohack();
