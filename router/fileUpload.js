var fs = require('fs');
var formidable = require('formidable');
var uploadSource = require('../model/uploadSource');

function fileUpload (req, res, options) {
    if ( !req || !res || !options || !options.uploadDir ) {
        return;
    }
    var form = new formidable.IncomingForm();

    form.uploadDir = options.uploadDir;
    form.keepExtensions = true;
    form.hash = 'md5';

    var maxSize = options.maxSize || 2097152;  //  默认文件最大2M

    form.on('file', function (name, file) {
        if( file.size > maxSize ) {
            fs.unlink(file.path);
            res.json({
                error : '文件大小超过限制'
            });
            return;
        }
        var path = '/' + file.path.replace(/\\/g, '/');
        var sourceData = {
            name : file.name,
            path : path,
            size : file.size,
            hash : file.hash
        }
        uploadSource.findOne({hash:file.hash}, function (err, data) {
            if( data ) {
                fs.unlink(file.path);
                sourceData.path = data.path;
                res.json(sourceData);
            } else {
                uploadSource.create(sourceData);
                res.json(sourceData);
            }
        });
    });
    form.parse(req);
}

module.exports = fileUpload;