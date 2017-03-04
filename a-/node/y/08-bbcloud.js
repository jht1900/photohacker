
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/08-bbcloud.jpg';
function app() {
	jimp.read(infile).then(function (img) {
		var width = img.bitmap.width;
		var height = img.bitmap.height;
		console.log(infile+' img width='+width+' height='+height);

		var cwidth = 4;
		var cheight = height;
		var cimg;
		var pix;
		var x = 0;
		var y = 0;
		for (; x < width; x += cwidth*2) {
			pix = img.getPixelColor(x, y+height/2);
			//console.log('x='+x+' y='+y+' pix='+pix.toString(16))
			cimg = new jimp(cwidth, cheight, pix);
			img.blit( cimg, x, y);
		}
		cwidth = width;
		cheight = 4;
		x = 0;
		y = 0;
		for (; y < height; y += cheight*2) {
			pix = img.getPixelColor(x+width/2, y);
			//console.log('x='+x+' y='+y+' pix='+pix.toString(16))
			cimg = new jimp(cwidth, cheight, pix);
			img.blit( cimg, x, y);
		}
		img.write(outfile);
		console.log('open '+outfile);
	}).catch(function (err) {
		console.log(err);
	});
}

app();
