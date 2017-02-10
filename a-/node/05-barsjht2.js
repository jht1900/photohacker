
var jimp = require("jimp");

var infile = '../img/JHT-CU.png';
var outfile = '../z-out/05-barsjht2.jpg';
function app() {
	jimp.read(infile).then(function (img) {
		var width = img.bitmap.width;
		var height = img.bitmap.height;
		console.log(infile+' img width='+width+' height='+height);

		var cwidth = width;
		var cheight = 8;
		var cimg;
		var pix;
		var x = 0;
		var y = 0;
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
