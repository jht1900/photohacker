
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/03-bars.jpg';
function app() {
	jimp.read(infile).then(function (img) {
		var width = img.bitmap.width;
		var height = img.bitmap.height;
		console.log(infile+' img width='+width+' height='+height);

		var cwidth = width;
		var cheight = 64;
		var cimg;
		var pix;
		var x;
		var y;

		x = 0;
		y = 0;
		pix = img.getPixelColor(x, y);
		console.log('x='+x+' y='+y+' pix='+pix.toString(16))
		cimg = new jimp(cwidth, cheight, pix);
		img.blit( cimg, x, y);

		y = cheight*2;
		pix = img.getPixelColor(x, y);
		console.log('x='+x+' y='+y+' pix='+pix.toString(16))
		cimg = new jimp(cwidth, cheight, pix);
		img.blit( cimg, x, y);

		y = cheight*4;
		pix = img.getPixelColor(x, y);
		console.log('x='+x+' y='+y+' pix='+pix.toString(16))
		cimg = new jimp(cwidth, cheight, pix);
		img.blit( cimg, x, y);

		img.write(outfile);
		console.log('open '+outfile);
	}).catch(function (err) {
		console.log(err);
	});
}

app();
