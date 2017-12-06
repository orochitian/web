var router = require('express').Router();
var storyCategory = require('../../model/storyCategory');
var story = require('../../model/story');
var pagination = require('./pagination');

router.get('/', function (req, res) {
    storyCategory.find(function (err, info) {
        var paginationModel = pagination.model(storyCategory, req.query.page, 2, 6, info.length);
        paginationModel.sort('-created_at').then(function (story) {
            res.render('manage/category.html', {
                title : '故事管理',
                category : 'story',
                categoryName : '故事',
                datas : story,
                pageInfo : pagination.pageInfo
            });
        });
    });
});

//  添加分类
router.post('/addCategory', function (req, res) {
    storyCategory.findOne({name : req.body.name}, function (err, info) {
        if( info ) {
            res.send('分类已存在，你说尴尬不尴尬');
        } else {
            storyCategory.create({
                name : req.body.name,
                describe : req.body.describe,
                show : req.body.show
            }, function () {
                res.redirect('/manage/story');
            });
        }
    });
});

//  编辑分类
router.post('/editCategory', function (req, res) {
    storyCategory.findOne({name : req.body.name}, function (err, info) {
        if( info && info._id != req.body.id ) {
            res.send('分类已存在，你说尴尬不尴尬');
        } else {
            storyCategory.findById(req.body.id, function (err, category) {
                story.update({category:category.name}, {category:req.body.name}, {multi:true}, function () {});
                storyCategory.update({_id : req.body.id}, {
                    name : req.body.name,
                    describe : req.body.describe,
                    show : req.body.show
                }, function (err, raw) {
                    res.redirect('/manage/story');
                });
            });
        }
    });
});

//  删除分类
router.get('/deleteCategory', function (req, res) {
    story.remove({category:req.query.category}, function () {});
    storyCategory.remove({_id : req.query.sid}, function (err) {
        res.redirect('/manage/story?page=' + req.query.page);
    });
});

//  异步分类验证
router.post('/addCategoryExists', function (req, res) {
    storyCategory.findOne({name: req.body.name}, function (err, info) {
        info ? res.json({valid: false}) : res.json({valid: true});
    });
});
//  编辑分类时验证是否存在  要排除自身
router.post('/editCategoryExists', function (req, res) {
    storyCategory.findOne({name: req.body.name}, function (err, info) {
        if( info && info._id != req.body.sid ) {
            res.json({valid: false});
        } else {
            res.json({valid: true});
        }
    });
});
//  分类验证  结束

//  分类详情列表
router.get('/:name', function (req, res) {
    storyCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            story.find({category:req.params.name}, function (err, stories) {
                res.render('manage/list.html', {
                    datas : stories,
                    title : req.params.name,
                    category : 'story',
                    categoryName : '故事'
                });
            }).sort('-created_at');
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});
//  分类详情列表  结束

//  写故事
router.get('/:name/add', function (req, res) {
    storyCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            res.render('manage/add.html', {
                category : req.params.name,
                categoryName : '故事',
                parent : 'story',
                title : '故事记录'
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});
router.post('/:name/add', function (req, res) {
    storyCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            storyCategory.update({name: req.params.name}, {$inc: { childNum: 1 }}, function() {});
            story.create({
                title : req.body.title,
                preview : req.body.preview,
                category : req.params.name,
                content : req.body.content
            }, function () {
                res.redirect('/manage/story/' + req.params.name);
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});
//  写故事  结束

//  编辑故事
router.get('/:name/edit/:sid', function (req, res) {
    storyCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            story.findOne({_id:req.params.sid, category:req.params.name}, function (err, story) {
                if( story ) {
                    storyCategory.find(function (err, categories) {
                        res.render('manage/edit.html', {
                            categories : categories,
                            category : story.category,
                            title : story.title,
                            preview : story.preview,
                            content : story.content,
                            id: story._id,
                            parent : 'story',
                            categoryName : '故事'
                        });
                    });
                } else {
                    res.send('分类下文章不存在，你说尴尬不尴尬');
                }
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});
router.post('/:name/edit/:sid', function (req, res) {
    story.findOne({_id:req.params.sid}, function (err, info) {
        if( info.category != req.body.category ) {
            storyCategory.update({name: req.body.category}, {$inc: { childNum: 1 }}, function() {});
            storyCategory.update({name: req.params.name}, {$inc: { childNum: -1 }}, function() {});
        }
        story.findOneAndUpdate({_id:req.params.sid}, {
            title : req.body.title,
            preview : req.body.preview,
            category : req.body.category,
            content : req.body.content
        }, function (err, story) {
            res.redirect('/manage/story/' + req.params.name);
        });
    });

});
//  编辑故事  结束

//  删除故事
router.get('/:name/delete/:sid', function (req, res) {
    storyCategory.update({name: req.params.name}, {$inc: { childNum: -1 }}, function() {});
    story.remove({_id:req.params.sid}, function (err, info) {
        res.redirect('/manage/story/' + req.params.name);
    });
});
//  删除故事  结束

module.exports = router;
