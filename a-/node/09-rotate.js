
var jimp = require("jimp");

var infile = '../z-in/IMG_8027-beads.jpg';
var outfile = '../z-out/IMG_8027-beads-out.jpg';
function app() {
	jimp.read(infile, function (err, img) {
		if (err) throw err;
		var width = img.bitmap.width;
		var height = img.bitmap.height;
		console.log('img width='+width+' height='+height);
		var degrees = 45;
		var msg = ''+degrees;
		var x = width / 2;
		var y = height - 64;
		var resize = false;
		img.rotate(degrees, resize);
		jimp.loadFont(jimp.FONT_SANS_64_BLACK).then(function (font) {
			img.print(font, x, y, msg);
			img.write(outfile); // save
			console.log('open '+outfile);
		});
	});
}

app();
