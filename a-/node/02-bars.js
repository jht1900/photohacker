
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/01-bars.jpg';
function app() {
	jimp.read(infile).then(function (img) {
		var width = img.bitmap.width;
		var height = img.bitmap.height;
		console.log(infile+' img width='+width+' height='+height);

		var cwidth = width;
		var cheight = 64;
		var cimg;

		cimg = new jimp(cwidth, cheight, 0xFF0000FF);
		img.blit( cimg, 0, 0);

		cimg = new jimp(cwidth, 64, 0x00FF00FF);
		img.blit( cimg, 0, cheight*2);

		cimg = new jimp(cwidth, 64, 0x0000FFFF);
		img.blit( cimg, 0, cheight*4);

		img.write(outfile);
		console.log('open '+outfile);
	}).catch(function (err) {
		console.log(err);
	});
}

app();
