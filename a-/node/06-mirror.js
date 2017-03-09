
var jimp = require("jimp");

var infile = '../img/JHT-CU.png';
var outfile = '../z-out/06-mirror.png';

function phack_img(img) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log(infile+' img width='+width+' height='+height);
	var offset = 0;
	for (var y = 0; y < height; y++) {
		var mid = Math.floor(width/2) - offset ;
		for (var x = 0; x < mid; x++) {
			var pix = img.getPixelColor(x, y);
			img.setPixelColor(pix, width - x - offset*2, y);
		}
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

// image.getPixelColor(x, y);      // returns the colour of that pixel e.g. 0xFFFFFFFF
// image.setPixelColor(hex, x, y); // sets the colour of that pixel
