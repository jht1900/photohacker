
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/cloud1-test.jpg';
// open a file called 'cloud1.jpg' and resize and greyscale it to 128x128
function app() {
	jimp.read(infile, function (err, img) {
		if (err) throw err;
		img.resize(128, 128)            // resize
				 .quality(60)                 // set JPEG quality
				 .greyscale()                 // set greyscale
				 .write(outfile); // save
		console.log('open '+outfile);
	});
}

app();
