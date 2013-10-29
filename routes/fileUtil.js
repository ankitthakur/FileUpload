var FileUtil = function (destination_file, fileName, file, res, type, callback) {
	
	var copyFile = function () {
		var ncp				= require('ncp').ncp;
		
		ncp(this.sourcePath, this.destPath, function (err) {
			console.log(err);
			if (err) {
				console.log(err);
				return err;
			}
			else{
				if(type==='video'){
					takeThumbnailImage(this.destPath, this.thumbPath, this.fileName);
					return 'thumbnail is done';
				}
			}
		});
	
	};
	
	
	var constructor = function (destination_file, fileName, file, res, type) {
	
		console.log(JSON.stringify(destination_file));
		console.log(JSON.stringify(file));
		this.file = file[fileName];
		var dt                   = currentDate(),
		fName 				= this.file['name'];
		console.log(fName);
		fName = fName.replace(/[^a-z .A-Z0-9]/g,'');
		fName = fName.replace(/[^a-z.A-Z0-9]/g,'_');
		this.fileName = fName;
	
	
		this.destPath             = destination_file + currentDate() + this.fileName,
		this.sourcePath             = this.file['path'],
		this.fileName                   = getFileName(fName),
		this.fileName                   = dt + this.fileName + '.jpg',
		this.thumbPath               = destination_file + currentDate() + this.fileName;
		process.on('fileTransfer', copyFile());
	};
	constructor(destination_file, fileName, file, res, type);
};



module.exports = FileUtil;

// utils

var takeThumbnailImage    = function(filePath, thumbnailPath, thumbImageName){
	
	try {
		var child_process	= require('child_process'),
			exec 			= child_process.exec;
		
		var child = exec('ffmpeg -i ' + filePath + ' -deinterlace -an -ss 2 -f mjpeg -t 1 -r 1 -y '+ thumbnailPath+thumbImageName + ' 2>&1',
			function (error, stdout, stderr) {
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			});
		} catch(e){
		console.log(e);
	}
};

var currentDate         = function() {
	var date = new Date();
	var dateString = date.toUTCString();
	dateString = dateString.replace(/[^a-zA-Z0-9]/g,'_');
	return dateString;
};

var fileExtension         = function (fileName) {
	var a                    = fileName.split();
	if (a.length == 1 || (a[0] = "" && a.length == 2)) {
		return "";
	}
	return a.pop();
};
var getFileName           = function (fileName) {
	var a                    = fileName.split('.');
	return a[0];
};