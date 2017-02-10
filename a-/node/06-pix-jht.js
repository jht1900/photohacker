
var jimp = require("jimp");

var infile = '../img/JHT-CU.png';
var outfile = '../z-out/06-pix-jht.png';

function app() {
	jimp.read(infile, function (err, img) {
		if (err) throw err;
		var width = img.bitmap.width;
		var height = img.bitmap.height;
		console.log(infile+' img width='+width+' height='+height);
		var scale = 16;
		var nwidth = Math.round( width / scale);
		var nheight = Math.round( height / scale);
		img.resize(nwidth, nheight);
		var mode = jimp.RESIZE_NEAREST_NEIGHBOR;
		img.resize(width, height, mode);
		img.write(outfile); // save
		console.log('open '+outfile);
	});
}

app();

// jimp.RESIZE_NEAREST_NEIGHBOR;
// jimp.RESIZE_BILINEAR;
// jimp.RESIZE_BICUBIC;
// jimp.RESIZE_HERMITE;
// jimp.RESIZE_BEZIER;
