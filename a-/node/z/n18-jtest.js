
var jimp = require("jimp");

var m_height = 2448;
var m_width = 3264;
var s_height = m_height / 4;
var s_width = m_width / 4;
var back = '/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/IMG_6432-back.jpg'
var fore1 = '/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/Blue/IMG_6485.jpg'
var fore1_mini = '/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/Blue/IMG_6485.jpg-mini.jpg'
var fore2 = '/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/dark/IMG_6433.jpg';
var fore2_mini = '/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/dark/IMG_6433.jpg-mini.jpg';
var out_path = '/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card-Prep/card1/out.jpg';

function resize () {
	jimp.read(fore2).then(function (img) {
			img.resize(s_width, s_height)            // resize
					 .write(fore2+'-mini.jpg'); // save
	})
	.catch(function (err) {
		// handle an exception
		console.log('resize err='+err);
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

//resize();
//comp();

// image.composite( src, x, y );     // composites another jimp image over this image at x, y
// image.resize(jimp.AUTO, 250);     // resize the height to 250 and scale the width accordingly
//
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
