
var jimp = require("jimp");

var infile = '/Users/jht/Desktop/IMG_8268.JPG';
var outfile = '../z-out/01-print-kindu.jpg';

// Write message on photo
function phack_img(img, font) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log(infile+' width='+width+' height='+height);
	var msg = 'Hello world!Hello world!Hello world Kindu';
	var x = (width / 2) - 100;
	var y = height / 2;
	img.print(font, x, y, msg);

	img.write(outfile); // save
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

phack_run();
