
var path 			= require('path'),
	child_process	= require('child_process');
	

exports.index             = function (req, res) {
	res.render('index', {
		title: 'Express'
	});
};

exports.uploadImage       = function (req, res, form) {
	var filepath             = path.join(__dirname + '../../public/images/');
	form.parse(req, function(err, fields, files) {
		copyFile(filepath, fields, files, res, 'image');
	});
};

exports.uploadVideo       = function (req, res, form) {
	var filepath             = path.join(__dirname + '../../public/videos/');
	form.parse(req, function(err, fields, files) {
		copyFile(filepath, fields, files, res, 'video');
	});
};

var fileUtil = function(destination_file, fileName, files, res, type){
	var FileUtil = require('./fileUtil');
	return fileUtil = new FileUtil(destination_file, fileName, files, res, type);
}

var copyFile              = function(destination_file, fields, files, res, type){
	
	try {
		
		for(var fileName in files){
			var child = child_process.fork(fileUtil(destination_file, fileName, files, res, type));
			child.on('fileTransfer', function(m) {
			  // Receive results from child process
			  console.log('received: ' + m);
			});
			
			
		}
		
		
	} catch(e){
			console.log(e);
	}
	
	
	res.send({
		message : 'done'
	});
};