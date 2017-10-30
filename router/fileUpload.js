var fs = require('fs');
var slider = require('../model/slider');
var formidable = require('formidable');

function fileUpload (req, res, options) {
    if ( !req || !res || !options || !options.uploadDir ) {
        return;
    }
    var form = new formidable.IncomingForm();

    form.uploadDir = options.uploadDir;
    form.keepExtensions = true;
    form.hash = 'md5';

    var maxSize = options.maxSize || 2097152;  //  默认文件最大2M

    // form.on('fileBegin', function (name, file) {
    //     if(form.bytesExpected > maxSize) {
    //         this.emit('error', '文件大小超过限制');
    //     }
    // });
    // form.on('error', function (message) {
    //     if( message ) {
    //         res.json({
    //             error : message
    //         });
    //     } else {
    //         res.json({
    //             error : '上传失败，请重新上传。'
    //         });
    //     }
    // });
    form.on('file', function (name, file) {
        if( file.size > maxSize ) {
            fs.unlink(file.path);
            res.json({
                error : '文件大小超过限制'
            });
            return;
        }
        slider.findOne({imgHash:file.hash}, function (err, data) {
            if( data ) {
                console.log('已存在');
                fs.unlink(file.path);
                res.json({
                    name : file.name,
                    path : data.imgPath,
                    size : file.size,
                    hash : file.hash
                });
            } else {
                console.log('新图片');
                var path = file.path.replace(/\\/g, '/');
                res.json({
                    name : file.name,
                    path : '/' + path,
                    size : file.size,
                    hash : file.hash
                });
            }
        });
        // fs.rename(file.path, './uploadSource/slider/' + file.name);
    });
    form.parse(req);
}

module.exports = fileUpload;