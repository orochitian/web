var router = require('express').Router();
var uploadSource = require('../../model/uploadSource');
var fs = require('fs');
var path = require('path');

router.get('/', function (req, res) {
    res.render('manage/uploadSource.html', {
        title : '上传资源管理',
        categoryName : '123'
    });
});

//  获取分类下图片
router.post('/get', function (req, res) {
    uploadSource.find({}, function (err, photos) {
        var images = [];
        var config = [];
        for( var i=0; i<photos.length; i++ ) {
            images.push('<img class="file-preview-image" src="' + photos[i].path + '" >');
            config.push({
                extra : {
                    id : photos[i]._id,
                    path : photos[i].path
                },
                caption : photos[i].name,
                size : photos[i].size,
                downloadUrl : photos[i].path
            });
        }
        res.json({images : images, config : config});
    });
});

//  删除照片
router.post('/delete', function (req, res) {
    var filePath = path.resolve(__dirname, '../../' + req.body.path);
    fs.stat(filePath, function (err) {
        if( err ) {
            console.log(err);
        } else {
            fs.unlink(filePath, function () {
                uploadSource.findByIdAndRemove(req.body.id, function (){});
            });
        }
    });
    res.json({});
});

module.exports = router;
