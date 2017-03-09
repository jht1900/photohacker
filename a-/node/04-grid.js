
var jimp = require("jimp");

var infile = '../img/color-page-1024w.png';
var outfile = '../z-out/05-grid.jpg';

// Write message on photo
function phack_img(img, font) {
	var width = img.bitmap.width;
	var height = img.bitmap.height;
	console.log(infile+' width='+width+' height='+height);
	
	var grid_line_size = 1;
	var himg = new jimp(width, grid_line_size, 0xFFFFFFFF);	// White horizontal line
	var vimg = new jimp(grid_line_size, height, 0xFFFFFFFF);	// White vertial line
	
	var ngrid = 4;
	var xstep = (width / ngrid);
	var ystep = (height / ngrid);
	
	for (var gx = 0; gx < width; gx += xstep) {
		for (var gy = 0; gy <= height; gy += ystep) {

			img.blit( vimg, gx, 0);
			var ypos = gy;
			if (ypos == height) ypos = height-1;
			img.blit( himg, 0, gy);

			var cwidth = 120;		// Width of print box
			var cheight = 20;		// Height of print box
			var cimg = new jimp(cwidth, cheight, 0xFFFFFFFF);	// White background
			var cx = 4;
			var cy = 0;
			var msg = 'x='+Math.floor(gx)+' y='+Math.floor(gy);
			cimg.print(font, cx, cy, msg);
			ypos = ypos - cheight;
			if (ypos < 0) ypos = 0;
			img.blit( cimg, gx, ypos);
		}
	}
	
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
