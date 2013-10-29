var path = require('path'),
    child_process = require('child_process');


exports.index = function (req, res) {
    log(req, res);
    res.render('index', {
        title: 'Express'
    });
};

exports.uploadImage = function (req, res, form) {
    log(req, res);
    var filepath = path.join(__dirname + '../../public/images/');
    form.parse(req, function (err, fields, files) {
        copyFile(filepath, fields, files, res, 'image');
    });
};

exports.uploadVideo = function (req, res, form) {
    log(req, res);
    var filepath = path.join(__dirname + '../../public/videos/');
    form.parse(req, function (err, fields, files) {
        copyFile(filepath, fields, files, res, 'video');
    });
};

var fileUtil = function (destination_file, fileName, files, res, type) {
    var FileUtil = require('./fileUtil');
    return fileUtil = new FileUtil(destination_file, fileName, files, res, type);
}

var copyFile = function (destination_file, fields, files, res, type) {

    try {
        for (var fileName in files) {
            var child = child_process.fork(fileUtil(destination_file, fileName, files, res, type));
            child.on('fileTransfer', function (m) {
                // Receive results from child process
                console.log('received: ' + m);
            });
        }
    } catch (e) {
        console.log(e);
    }
    res.send({
        message: 'done'
    });
};

var log = function (req, res) {
    fs.exists('message.txt', function (exists) {
        if (exists) {
            fs.appendFile('message.txt', '\r\n', function (err) {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
        } else {
            fs.writeFile('message.txt', '\r\n', function (err) {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        }

        var data =
            'date: ' + new Date() + '\r' +
            'ips: ' + JSON.stringify(req.ips) + '\r' +
            'ip: ' + JSON.stringify(req.ip) + '\r' +
            'host: ' + JSON.stringify(req.host) + '\r' +
            'hostname: ' + JSON.stringify(req.hostname) + '\r' +
            'subdomains: ' + JSON.stringify(req.subdomains) + '\r' +
            'params: ' + JSON.stringify(req.params) + '\r' +
            'body: ' + JSON.stringify(req.body);

        fs.appendFile('message.txt', '\r user: ' + data, function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        });
    });
};