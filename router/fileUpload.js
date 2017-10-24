var fs = require('fs');
var formidable = require('formidable');

function fileUpload (req, res, options) {
    if ( !req || !res || !options || !options.uploadDir ) {
        return;
    }
    var form = new formidable.IncomingForm();

    form.uploadDir = options.uploadDir;
    form.keepExtensions = true;

    var maxSize = options.maxSize || 2097152;  //  默认文件最大2M

    form.on('fileBegin', function (name, file) {
        if(form.bytesExpected > maxSize) {
            this.emit('error', '文件超过大小限制');
        } else {
            res.json({});
        }
    });
    form.on('error', function (message) {
        if( message ) {
            res.status(413).json({
                err : message
            });
        } else {
            res.json({
                err : '上传失败，请重新上传。'
            });
        }
    });
    form.on('file', function (name, file) {
        if( file.size > maxSize ) {
            fs.unlink(file.path);
        }
    });
    form.parse(req);
}

module.exports = fileUpload;