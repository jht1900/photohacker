
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/cloud1-print.jpg';
function app() {
	jimp.read(infile, function (err, img) {
		if (err) throw err;
		var width = img.bitmap.width;
		var height = img.bitmap.height;
		console.log('img width='+width+' height='+height);
		var msg = 'Hello world[愛]!';
		var x = width / 2;
		var y = height / 2;
		jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(function (font) {
			img.print(font, x, y, msg);
			img.write(outfile); // save
			console.log('open '+outfile);
		});
	});
}

app();

// node jtest2.js
// open ../z-img-out/cloud2-test.jpg
