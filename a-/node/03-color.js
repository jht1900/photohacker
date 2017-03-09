
var jimp = require("jimp");

var infile = '../z-in/cloud1.jpg';
var outfile = '../z-out/03-color.jpg';

// Draw one band based on color in center of photo
function phack_img(img, font) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	var bwidth = width;
	var bheight = 32;
	var x = width/2;
	var y = height/2;
	var pix = img.getPixelColor(x, y);		// Pickup color from center
	console.log('x='+x+' y='+y+' pix='+pix.toString(16).toUpperCase());
	
	var bimg = new jimp(bwidth, bheight, pix);	// Create image with that color
	img.blit( bimg, 0, Math.floor(y-bheight/2));			// Draw band of color

	var cwidth = 160;		// Width of print box
	var cheight = 20;		// Height of print box
	var cimg = new jimp(cwidth, cheight, 0xFFFFFFFF);	// White background
	var cx = 4;
	var cy = 0;
	var msg = 'pix='+pix.toString(16).toUpperCase();
	cimg.print(font, cx, cy, msg);

	img.blit( cimg, Math.floor(x-cwidth/2), Math.floor(y-cheight/2));
	
	phack_write(img);
	console.log('open '+outfile);
}

function phack_run() {
	var p1 = jimp.read(infile);
	var p2 = jimp.loadFont(jimp.FONT_SANS_16_BLACK);
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

