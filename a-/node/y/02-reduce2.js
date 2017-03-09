
var jimp = require("jimp");

var infile = '../img/color-page-1024w.png';
var outfile = '../z-out/02-reduce2.png';

function phack_img(img) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log(infile+' img width='+width+' height='+height);
	var scale = 64;
	var nwidth = Math.floor( width / scale);
	var nheight = Math.floor( height / scale);
	img.resize(nwidth, nheight);			// Resize down
	var mode = jimp.RESIZE_NEAREST_NEIGHBOR;
	img.resize(nwidth*scale, nheight*scale, mode);	// Resize back to original size

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

// jimp.RESIZE_NEAREST_NEIGHBOR;
// jimp.RESIZE_BILINEAR;
// jimp.RESIZE_BICUBIC;
// jimp.RESIZE_HERMITE;
// jimp.RESIZE_BEZIER;
