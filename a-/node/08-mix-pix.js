
var jimp = require("jimp");

var infile = '../z-in/245-cu.png';
var outfile = '../z-out/245-cu-mix2.png';

function app() {
	jimp.read(infile, function (err, img) {
		if (err) throw err;
		var width = img.bitmap.width;
		var height = img.bitmap.height;
		console.log(infile+' img width='+width+' height='+height);
		var scale = 64;
		var nwidth = Math.round( width / scale);
		var nheight = Math.round( height / scale);
		img.resize(nwidth, nheight);
		var mode = jimp.RESIZE_NEAREST_NEIGHBOR;
		img.resize(width, height, mode);
		img.color([{apply: 'mix', params: [ '#f00', 20 ]}]);
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
