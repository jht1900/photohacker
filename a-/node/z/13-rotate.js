
var jimp = require("jimp");

var infile = '../z-in/IMG_8027-beads.jpg';
var outfolder = '../z-out/IMG_8027-beads-10/';

function app() {
	var steps = [
		jimp.read(infile),
		jimp.loadFont(jimp.FONT_SANS_64_BLACK),
		jimp.loadFont(jimp.FONT_SANS_64_WHITE)
	];
	Promise.all(steps).then(function (result) {
		process(result[0], result[1], result[2]);
	}).catch(function (err) {
		console.log(err);
	});
}
function process(imgsrc, font1, font2) {
	imgsrc.resize(jimp.AUTO, 720/4);
	var width = imgsrc.bitmap.width;
	var height = imgsrc.bitmap.height;
	var x = (width / 2) - (64/2);
	var y = (height / 2) - (64/2);
	var resize = false;
	var start = 0;
	var range = 360; // 360;
	var incr = 36;
	var count = 0;
	function next(index) {
		if (index >= range) return;
		count++;
		var msg = ''+count;
		var outfile = outfolder + pad(count) + '.jpg';
		var img = imgsrc.clone();
		img.rotate(index, resize);
		img.print(font2, x, y, msg);
		img.print(font1, x+1, y+1, msg);
		img.write(outfile, function (err) {
			if (err) console.log('err '+err);
			console.log('open '+outfile);
			next(index+incr);
		});
	}
	next(start);
}
function pad(num) {
	var str = ''+num;
	for (; str.length < 3; str = '0'+str) {
	}
	return str;
}
app();
