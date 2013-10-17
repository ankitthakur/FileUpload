var FileUtil = function () {



};

module.exports = FileUtil;

FileUtil.prototype.copyFile = function (src, dest, success, failure) {

    var fs = require('fs');
    var mv = require('mv');

    //    fs.rename(src, dest);

    mv(src, dest, {
        mkdirp: true
    }, function (err) {
        // done. it first created all the necessary directories, and then
        // tried fs.rename, then falls back to using ncp to copy the dir
        // to dest and then rimraf to remove the source dir
        if (err) {

            failure({
                error: err
            });
        } else {
            success({
                success: 'successfully copied'
            });
        }
    });
	
};