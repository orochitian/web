var router = require('express').Router();
var workCategory = require('../../model/workCategory');
var work = require('../../model/work');
var pagination = require('./pagination');
var getDate = require('../tools/getDate');

router.get('/', function (req, res) {
    workCategory.find(function (err, info) {
        var paginationModel = pagination.model(workCategory, req.query.page, 2, 6, info.length);
        paginationModel.sort('-created_at').then(function (work) {
            res.render('manage/category.html', {
                title : '工作管理',
                category : 'work',
                datas : work,
                categoryName : '工作',
                pageInfo : pagination.pageInfo
            });
        });
    });
});

//  添加分类
router.post('/addCategory', function (req, res) {
    workCategory.findOne({name : req.body.name}, function (err, info) {
        if( info ) {
            res.send('分类已存在，你说尴尬不尴尬');
        } else {
            workCategory.create({
                name : req.body.name,
                describe : req.body.describe,
                show : req.body.show
            }, function () {
                res.redirect('/manage/work');
            });
        }
    });
});

//  编辑分类
router.post('/editCategory', function (req, res) {
    workCategory.findById(req.body.id, function (err, info) {
        if( info && info._id != req.body.id ) {
            res.send('分类已存在，你说尴尬不尴尬');
        } else {
            work.update({category:info.name}, {
                category : req.body.name
            }, {multi:true}, function () {});
            workCategory.update({_id : req.body.id}, {
                name : req.body.name,
                describe : req.body.describe,
                show : req.body.show
            }, function (err, info) {
                res.redirect('/manage/work');
            });
        }
    });
});

//  删除分类
router.get('/deleteCategory', function (req, res) {
    work.remove({category:req.query.category}, function () {});
    workCategory.remove({_id : req.query.sid}, function (err) {
        res.redirect('/manage/work?page=' + req.query.page);
    });
});

//  异步分类验证
router.post('/addCategoryExists', function (req, res) {
    workCategory.findOne({name: req.body.name}, function (err, info) {
        info ? res.json({valid: false}) : res.json({valid: true});
    });
});
//  编辑分类时验证是否存在  要排除自身
router.post('/editCategoryExists', function (req, res) {
    workCategory.findOne({name: req.body.name}, function (err, info) {
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
    workCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            work.find({category:req.params.name}, function (err, stories) {
                var paginationModel = pagination.model(work, req.query.page, 2, 6, stories.length, {category:req.params.name});
                paginationModel.sort('-created_at').then(function (work) {
                    res.render('manage/list.html', {
                        datas : work,
                        title : req.params.name,
                        category : 'work',
                        categoryName : '工作',
                        pageInfo : pagination.pageInfo
                    });
                });
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});
//  分类详情列表  结束

//  写故事
router.get('/:name/add', function (req, res) {
    workCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            res.render('manage/add.html', {
                category : req.params.name,
                categoryName : '工作',
                parent : 'work',
                title : '工作记录',
                date : getDate(new Date(), 'yyyy-mm-dd', '-')
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});
router.post('/:name/add', function (req, res) {
    workCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            workCategory.update({name: req.params.name}, {$inc: { childNum: 1 }}, function() {});
            work.create({
                category : req.params.name,
                content : req.body.content,
                date : req.body.date,
                title : req.body.date
            }, function () {
                res.redirect('/manage/work/' + req.params.name);
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});
//  写故事  结束

//  编辑故事
router.get('/:name/edit/:sid', function (req, res) {
    workCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            work.findOne({_id:req.params.sid, category:req.params.name}, function (err, work) {
                if( work ) {
                    workCategory.find(function (err, categories) {
                        res.render('manage/edit.html', {
                            categories : categories,
                            category : work.category,
                            content : work.content,
                            id : work._id,
                            parent : 'work',
                            categoryName : '工作',
                            date : work.date,
                            title : work.title
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
    work.findOne({_id:req.params.sid}, function (err, info) {
        if( info.category != req.body.category ) {
            workCategory.update({name: req.body.category}, {$inc: { childNum: 1 }}, function() {});
            workCategory.update({name: req.params.name}, {$inc: { childNum: -1 }}, function() {});
        }
        work.findOneAndUpdate({_id:req.params.sid}, {
            category : req.body.category,
            content : req.body.content,
            date : req.body.date
        }, function (err, work) {
            res.redirect('/manage/work/' + req.params.name);
        });
    });

});
//  编辑故事  结束

//  删除故事
router.get('/:name/delete/:sid', function (req, res) {
    workCategory.update({name: req.params.name}, {$inc: { childNum: -1 }}, function() {});
    work.remove({_id:req.params.sid}, function (err, info) {
       res.redirect('/manage/work/' + req.params.name);
    });
});
//  删除故事  结束

module.exports = router;
