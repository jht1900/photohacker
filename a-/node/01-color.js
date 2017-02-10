
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/01-color.jpg';
function app() {
	jimp.read(infile).then(function (img) {
		var width = img.bitmap.width;
		var height = img.bitmap.height;
		console.log(infile+' img width='+width+' height='+height);

		var cimg = new jimp(256, 64, 0xFF0000FF);
		var cwidth = cimg.bitmap.width;
		var cheight = cimg.bitmap.height;
		console.log(' cimg cwidth='+cwidth+' cheight='+cheight);

		img.blit( cimg, 0, 0);

		cimg = new jimp(256, 64, 0x00FF00FF);
		// cimg.color( [
	  //   { apply: 'red', params: [ 0 ] },
	  //   { apply: 'green', params: [ 255 ] },
	  //   { apply: 'blue', params: [ 0 ] }
		// ]);

		img.blit( cimg, 0, cheight*2);

		img.write(outfile);
		console.log('open '+outfile);
	}).catch(function (err) {
		console.log(err);
	});
}

app();
