
var fs = require('fs');
var jimp = require('jimp');

var m_width = 3264;
var m_height = 2448;
var grind_scale = 0.25;
var margin_factor = 0.025;
var s_width = Math.trunc( m_width*grind_scale*(1-margin_factor) );
var s_height =  Math.trunc( m_height*grind_scale*(1-margin_factor) );
var s_x_margin = Math.trunc( m_width*grind_scale*margin_factor/2 );
var s_y_margin = Math.trunc( m_height*grind_scale*margin_factor/2 );

var back = '/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/zbkg/IMG_6432-back.jpg'
var out_path = '/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/out.jpg';
var fore1 = '/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/Blue/IMG_6485.jpg'
var mini_suffix = '-mini.jpg';
var minis = [
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/Blue/IMG_6485.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/Medium/IMG_6439.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/dark/IMG_6433.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/light-white/IMG_6442.jpg-mini.jpg",

  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/Medium/IMG_6519.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/dark/IMG_6524.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/light-white/IMG_6456.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/Blue/IMG_6495.jpg-mini.jpg",

  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/dark/IMG_6571.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/Blue/IMG_6530.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/Medium/IMG_6561.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/light-white/IMG_6497.jpg-mini.jpg",

  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/light-white/IMG_6520.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/Blue/IMG_6545.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/Medium/IMG_6565.jpg-mini.jpg",
  "/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/dark/IMG_6671.jpg-mini.jpg",
];

comp_all();
//find_mini();
// resize(out_path);
//resize();
//comp();
//resize_all();

function comp_all() {
	var arr = [];
	arr.push( jimp.read(back) );
	minis.forEach(function(path) {
		console.log('comp_all path='+path);
		arr.push( jimp.read(path) );
	});
	Promise.all(arr).then(function (images) {
		console.log('comp_all images.length='+images.length);
		var backi = images[0];
		images.splice(0,1);
		var xpos = s_x_margin;
		var ypos = s_y_margin;
		images.forEach(function(fore) {
			console.log('comp_all xpos='+xpos+' ypos='+ypos);
			backi.composite( fore, xpos, ypos);
			xpos += s_width + 2 * s_x_margin;
			if (xpos > m_width) {
				xpos = s_x_margin;
				ypos += s_height + 2 * s_y_margin;
			}
		});
		backi.write( out_path );
	});
}

function find_mini() {
	var arr = [];
	visit_files_at_path('/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1', function (info) {
		if (! info.path.endsWith(mini_suffix)) return;
		arr.push( info.path );
	});
	console.log( JSON.stringify( arr, null, 2) );
}

function resize_all() {
	visit_files_at_path('/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1', function (info) {
		console.log('resize_all info.path='+info.path);
		if (info.path.endsWith(mini_suffix)) return;
		var path_mini = info.path + mini_suffix;
		//if (fs.existsSync(path_mini)) return;
		resize(info.path);
	});
}

function resize(filepath) {
	jimp.read(filepath).then(function (img) {
			img.resize(s_width, jimp.AUTO)
					 .write(filepath+'-mini.jpg');
			console.log('resize '+filepath);
	})
	.catch(function (err) {
		// handle an exception
		console.log('resize err='+err+' filepath='+filepath);
	});
}

function comp () {
	var p1 = jimp.read(out_path);
	var p2 = jimp.read(fore2_mini);
	Promise.all([p1, p2]).then(function (images) {
		var backi = images[0];
		var fore = images[1];
		backi.composite( fore, s_width, 0).write( out_path );
	}).catch(function (err) {
			console.log(err);
	});
}

// image.composite( src, x, y );     // composites another jimp image over this image at x, y
// image.resize(jimp.AUTO, 250);     // resize the height to 250 and scale the width accordingly

// var p1 = jimp.read("lenna.png");
// var p2 = jimp.read("https://upload.wikimedia.org/wikipedia/commons/0/01/Bot-Test.jpg");
//
// Promise.all([p1, p2]).then(function (images) {
//     var lenna = images[0];
//     var bucket = images[1].scale(0.5);
//
//     lenna.clone().blit(bucket, 0, 0).write("./output/blit1.png");
//     lenna.clone().blit(bucket, 50, 50, 50, 50, 128, 128).write("./output/blit2.png");
//     lenna.clone().blit(bucket, 0, 0, 50, 50, 128, 128).write("./output/blit3.png");
// }).catch(function (err) {
//     console.log(err);
// });

function visit_files_at_path(path, func) {
	var filenames = fs.readdirSync(path);
	for (var index = 0; index < filenames.length; index++) {
		var filename = filenames[index];
		if (filename.substr(0,1) == '.') continue;
		var fullpath = path + '/' + filename;
		var stat = fs.statSync( fullpath );
		if (stat.isDirectory()) {
			var dir_filenames = fs.readdirSync(fullpath);
			for (var dindex = 0; dindex < dir_filenames.length; dindex++) {
				var dname = dir_filenames[dindex];
				if (dname.substr(0,1) == '.') continue;
				filenames.push( filename + '/' + dname );
			}
		}
		else {
			func({path: fullpath});;
		}
	}
}
