
var jimp = require("jimp");

var infile = '../z-in/245-cu.png';
var outfile = '../z-out/245-cu-poster.png';

function app() {
	jimp.read(infile, function (err, img) {
		if (err) throw err;
		img.posterize(8);
		img.write(outfile); // save
		console.log('open '+outfile);
	});
}

app();
