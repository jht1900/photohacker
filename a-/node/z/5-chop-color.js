
var jimp = require("jimp");

var infile = '/Users/jht/Google Drive/DICE/-Photohacker-Poster/color-page-72.png';
var outfile = '/Users/jht/Google Drive/DICE/-Photohacker-Poster/poster-color-page/cp';

function app() {
	jimp.read(infile, function (err, img) {
		if (err) throw err;
		var width = img.bitmap.width;
		var height = img.bitmap.height;
		console.log(infile+' img width='+width+' height='+height);
		var scale = 4;
		var srcw = Math.round( width / scale);
		var srch = Math.round( height / scale);
		var srcx = 0;
		var srcy = 0;
		var x = 0;
		var y = 0;
		var imgout = new jimp(srcw, srch)
		var index = 0;
		for(;; index++) {
			imgout.blit( img, x, y, srcx, srcy, srcw, srch );
			var file = outfile+'-'+index+'.png';
			imgout.write(file); // save
			console.log('open '+file);
			srcx += srcw;
			if (srcx >= width) {
				srcx = 0;
				srcy += srch;
				if (srcy >= height) break;
			}
		}
	});
}

app();

// image.blit( src, x, y[, srcx, srcy, srcw, srch] );
// var image = new jimp(256, 256)
