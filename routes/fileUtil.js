var FileUtil = function () {



};

module.exports = FileUtil;

FileUtil.prototype.copyFile = function (src, dest, success, failure) {

    console.log('start copy');
    console.log('src : ' + src);
    console.log('dest : ' + dest);
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



    //    var readStream = fs.createReadStream(src);
    //    var writeStream = fs.createWriteStream(dest);
    //
    //    readStream.on('data', function (chunk) {
    //        console.log('got %d bytes of data', chunk.length);
    //    });
    //
    //    readStream.on('readable', function () {
    //        var chunk;
    //        while (null !== (chunk = readStream.read())) {
    //            console.log('got %d bytes of data', chunk.length);
    //        }
    //    });
    //
    //    readStream.on('end', function () {
    //
    ////        exec("ffmpeg -i Video/thumb  -ss 01:30 -r 1 -an -vframes 1 -f mjpeg Video/thumb.jpg", function (err) {
    ////
    ////
    ////        });
    //
    //        readStream.unpipe(readStream);
    //
    //
    //            /* copied */
    //            fs.unlinkSync(src);
    //
    //
    //            success({
    //                success: 'successfully copied'
    //            });
    //
    //
    //    });
    //
    //
    //    writeStream.on('error', function (err) {
    //        readStream.unpipe(readStream);
    //        /* error */
    //        failure({
    //            error: err
    //        });
    //    });
    //
    //    writeStream.on('pipe', function (src) {
    //        console.log('something is piping into the writer');
    //        console.log(JSON.stringify(src) + '\n:\n' + JSON.stringify(readStream));
    //
    //    });
    //
    //    writeStream.on('unpipe', function (src) {
    //        console.log('something has stopped piping into the writer');
    //        console.log(JSON.stringify(src) + '\n:\n' + JSON.stringify(readStream));
    //    });
    //
    //    readStream.pipe(writeStream);



};