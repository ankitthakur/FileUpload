var fs = require('fs'),
    path = require('path');


exports.index = function (req, res) {
    res.render('index', {
        title: 'Express'
    });
};

exports.uploadImage = function (req, res) {
    console.log(req.files.fileUpload.name);
    console.log(req.files.fileUpload.path);

    var filepath = path.join(__dirname + '../../public/images/');
    copyFile(filepath, req, res);
};

exports.uploadVideo = function (req, res) {
    console.log(req.files.fileUpload.name);
    console.log(req.files.fileUpload.path);
    var filepath = path.join(__dirname + '../../public/videos/');
    copyFile(filepath, req, res);
};

// utils

var fileExtension = function (fileName) {
    var a = fileName.split();
    if (a.length == 1 || (a[0] = "" && a.length == 2)) {
        return "";
    }
    return a.pop();
};

var copyFile = function(destination_file, req, res){

    FileUtil = require('./fileUtil');
    var util = new FileUtil();


    var dt = new Date();

    destination_file = destination_file + dt.toISOString() + req.files.fileUpload.name;
    var source_file = req.files.fileUpload.path;

    util.copyFile(source_file, destination_file, function () {
        res.send({
            success: "file is uploaded successfully"
        });
    }, function (err) {
        res.send({
            error: err
        });
    });
};