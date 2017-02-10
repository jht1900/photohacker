
var jimp = require("jimp");

var infile = '../z-in/IMG_8027-beads.jpg';
var outfolder = '../z-out/IMG_8027-beads/';

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
	var width = imgsrc.bitmap.width;
	var height = imgsrc.bitmap.height;
	console.log('img width='+width+' height='+height);
	var x = width / 2;
	var y = height / 2;
	var resize = false;
	var start = 160;
	var range = 260; // 360;
	function next(index) {
		if (index >= range) return;
		var msg = ''+index;
		var outfile = outfolder + pad(index) + '.jpg';
		var img = imgsrc.clone();
		img.rotate(index, resize);
		img.print(font2, x, y, msg);
		img.print(font1, x+1, y+1, msg);
		img.write(outfile, function (err) {
			if (err) console.log('err '+err);
			console.log('open '+outfile);
			next(index+1);
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
