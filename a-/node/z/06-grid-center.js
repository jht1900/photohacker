
var jimp = require("jimp");

var infile = '../img/color-page-1024w.png';
var outfile = '../z-out/06-grid-center.jpg';

// Write message on photo
function phack_img(img, font) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log(infile+' width='+width+' height='+height);
	
	var grid_line_size = 1;
	var himg = new jimp(width, grid_line_size, 0xFFFFFFFF);	// White horizontal line
	
	var vimg = new jimp(grid_line_size, height, 0xFFFFFFFF);	// White vertial line
	
	var tx = Math.floor(width / 2);		// Center of screen
	var ty = Math.floor(height / 2);
	
	img.blit( himg, 0, ty);
	img.blit( vimg, tx, 0);

	var cwidth = 196;		// Width of print box
	var cheight = 40;		// Height of print box
	var msg = 'x='+tx+' y='+ty;
	var cimg = new jimp(cwidth, cheight, 0xFFFFFFFF);	// White background
	var cx = 4;
	var cy = 0;
	cimg.print(font, cx, cy, msg);
	img.blit( cimg, tx, ty);

	phack_write( img );
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
