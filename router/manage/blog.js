var router = require('express').Router();
var blogCategory = require('../../model/blogCategory');
var blog = require('../../model/blog');
var pagination = require('./pagination');

router.get('/', function (req, res) {
    blogCategory.find(function (err, info) {
        var paginationModel = pagination.model(blogCategory, req.query.page, 2, 6, info.length);
        paginationModel.sort('-created_at').then(function (blog) {
            res.render('manage/category.html', {
                title : '博客管理',
                category : 'blog',
                categoryName : '博客',
                datas : blog,
                pageInfo : pagination.pageInfo
            });
        });
    });
});

//  添加分类
router.post('/addCategory', function (req, res) {
    blogCategory.findOne({name : req.body.name}, function (err, info) {
        if( info ) {
            res.send('分类已存在，你说尴尬不尴尬');
        } else {
            blogCategory.create({
                name : req.body.name,
                describe : req.body.describe,
                show : req.body.show
            }, function () {
                res.redirect('/manage/blog');
            });
        }
    });
});

//  编辑分类
router.post('/editCategory', function (req, res) {
    blogCategory.findById(req.body.id, function (err, info) {
        if( info && info._id != req.body.id ) {
            res.send('分类已存在，你说尴尬不尴尬');
        } else {
            blog.update({category:info.name}, {
                category : req.body.name
            }, {multi:true}, function () {});
            blogCategory.update({_id : req.body.id}, {
                name : req.body.name,
                describe : req.body.describe,
                show : req.body.show
            }, function (err, info) {
                res.redirect('/manage/blog');
            });
        }
    });
});

//  删除分类
router.get('/deleteCategory', function (req, res) {
    blog.remove({category:req.query.category}, function () {});
    blogCategory.remove({_id : req.query.sid}, function (err) {
        res.redirect('/manage/blog?page=' + req.query.page);
    });
});

//  异步分类验证
router.post('/addCategoryExists', function (req, res) {
    blogCategory.findOne({name: req.body.name}, function (err, info) {
        info ? res.json({valid: false}) : res.json({valid: true});
    });
});
//  编辑分类时验证是否存在  要排除自身
router.post('/editCategoryExists', function (req, res) {
    blogCategory.findOne({name: req.body.name}, function (err, info) {
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
    blogCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            blog.find({category:req.params.name}, function (err, stories) {
                var paginationModel = pagination.model(blog, req.query.page, 2, 6, stories.length, {category:req.params.name});
                paginationModel.sort('-created_at').then(function (blog) {
                    res.render('manage/list.html', {
                        datas : blog,
                        title : req.params.name,
                        category : 'blog',
                        categoryName : '博客',
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

//  写博客
router.get('/:name/add', function (req, res) {
    blogCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            res.render('manage/add.html', {
                category : req.params.name,
                categoryName : '博客',
                parent : 'blog',
                title : '博客记录'
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});
router.post('/:name/add', function (req, res) {
    blogCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            blogCategory.update({name: req.params.name}, {$inc: { childNum: 1 }}, function() {});
            blog.create({
                title : req.body.title,
                preview : req.body.preview,
                category : req.params.name,
                content : req.body.content
            }, function () {
                res.redirect('/manage/blog/' + req.params.name);
            });
        } else {
            res.send('分类不存在，你说尴尬不尴尬');
        }
    });
});
//  写博客  结束

//  编辑博客
router.get('/:name/edit/:sid', function (req, res) {
    blogCategory.findOne({name:req.params.name}, function (err, info) {
        if( info ) {
            blog.findOne({_id:req.params.sid, category:req.params.name}, function (err, blog) {
                if( blog ) {
                    blogCategory.find(function (err, categories) {
                        res.render('manage/edit.html', {
                            categories : categories,
                            category : blog.category,
                            title : blog.title,
                            preview : blog.preview,
                            content : blog.content,
                            id: blog._id,
                            parent : 'blog',
                            categoryName : '博客'
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
    blog.findOne({_id:req.params.sid}, function (err, info) {
        if( info.category != req.body.category ) {
            blogCategory.update({name: req.body.category}, {$inc: { childNum: 1 }}, function() {});
            blogCategory.update({name: req.params.name}, {$inc: { childNum: -1 }}, function() {});
        }
        blog.findOneAndUpdate({_id:req.params.sid}, {
            title : req.body.title,
            preview : req.body.preview,
            category : req.body.category,
            content : req.body.content
        }, function (err, blog) {
            res.redirect('/manage/blog/' + req.params.name);
        });
    });

});
//  编辑博客  结束

//  删除博客
router.get('/:name/delete/:sid', function (req, res) {
    blogCategory.update({name: req.params.name}, {$inc: { childNum: -1 }}, function() {});
    blog.remove({_id:req.params.sid}, function (err, info) {
        res.redirect('/manage/blog/' + req.params.name);
    });
});
//  删除博客  结束

module.exports = router;
