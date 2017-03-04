
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/01-print.jpg';

// Write message on photo
function phack_img(img, font) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log(infile+' width='+width+' height='+height);
	var x = (width / 2) - 100;
	var y = height / 2;
	var msg = 'Hello world! x='+x+' y='+y;
	img.print(font, x, y, msg);

	phack_write( img );
	console.log('open '+outfile);
}

function phack_run() {
	var p1 = jimp.read(infile);
	var p2 = jimp.loadFont(jimp.FONT_SANS_32_BLACK);
	Promise.all([p1, p2]).then(function (result) {
		phack_img(result[0], result[1])
	}).catch(function (err) {
		console.log(err);
	});
}
function phack_write(img) {
	img.write(outfile, function (err) { if (err) throw err; });
}
phack_run();
