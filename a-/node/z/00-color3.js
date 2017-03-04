
var jimp = require("jimp");

var outfile = '../z-out/00-color3.jpg';

function phack_run(img) {
	var dpi = 360;
  var width = Math.floor(8.5 * dpi);
  var height = Math.floor(11.0 * dpi);
	var cx = width / 2,
			cy = height / 2,
			radius = width / 8,
			imageData,
			pixels,
			hue, sat, value,
			i = 0, x, y, rx, ry, d,
			f, g, p, u, v, w, rgb;

	var img = new jimp(width, height, 0xFFFFFFFF);
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

	img.write(outfile, function (err) {
		if (err) console.log(err);
	});

	console.log('open '+outfile);
}

phack_run();
