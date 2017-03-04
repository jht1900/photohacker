
var jimp = require("jimp");

var infile = '../z-in/cloud1x.jpg';
var outfile = '../z-out/00-resize.jpg';

// Resize input photo
function phack_img(img) {
	img.resize(128, 128); 	// resize
	img.quality(60);    // set JPEG quality
	img.greyscale();     // set greyscale

	img.write(outfile);
	console.log('open '+infile);
	console.log('open '+outfile);
}

function phack_run() {
	jimp.read(infile).then(function (img) {
		phack_img(img);
	}).catch(function (err) {
		console.log(err);
	});
}
phack_run();
