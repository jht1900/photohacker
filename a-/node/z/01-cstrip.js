
var jimp = require("jimp");

//var outfile_prefix = '../z-out/00-cstrip/c-';
var outfile_prefix = '/Volumes/PEACH/dice-exchange/color-strip-long/c-';
 
var count_mid = 60*10;
var count_end = 120*10;
var count_step = 1;
var range_start = 1;
var range_step = (10 - range_start)/count_mid;

function phack_run(step, count) {
	if (count == count_mid) {
		range_step = -range_step;
	}
	else if (count > count_end) {
		return;
	}
	
  var width = 1920;
  var height = 1080;
var cx = width / 2;
var cy = height / 2;
var imageData;
var pixels;
var hue, sat, value;
var i = 0, x, y, rx, ry, d;
var f, g, p, u, v, w, rgb;
var radius = width / step;

	var img = new jimp(width, height);
	pixels = img.bitmap.data;

	for (y = 0; y < height; y = y + 1) {
			for (x = 0; x < width; x = x + 1, i = i + 4) {
					rx = x - cx;
					ry = y - cy;
					d = rx * rx + ry * ry;
					//if (d < radius * radius) {
							hue = 6 * (Math.atan2(ry, rx) + Math.PI) / (2 * Math.PI);
							sat = Math.sqrt(d) / radius;
							g = Math.floor(hue);
							f = hue - g;
							u = Math.floor( 255 * (1 - sat) );
							v = Math.floor( 255 * (1 - sat * f) );
							w = Math.floor( 255 * (1 - sat * (1 - f)) );
							pixels[i] = [255, v, u, u, w, 255, 255][g];
							pixels[i + 1] = [w, 255, 255, v, u, u, w][g];
							pixels[i + 2] = [u, u, w, 255, 255, v, u][g];
							pixels[i + 3] = 255;
					//}
			}
	}

	var outfile = outfile_prefix + count + '.jpg';
	img.write(outfile, function (err) {
		if (err) console.log(err);
		
		console.log('open '+outfile);
		
		phack_run(step+range_step, count+count_step);
	});
}

phack_run(range_start, 1);
