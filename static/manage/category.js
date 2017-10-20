$(function () {
    //  异步验证
    $.fn.remote = function (url) {
        var validOption = {
            trigger : 'change',
            //  验证字段
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: '分类名称不能为空。'
                        },
                        remote: {
                            url: url,
                            message: "分类已存在。",
                            type: "post",
                            dataType: 'json',
                            data : {
                                sid : function () {
                                    return $('#edit-modal').find('[name="id"]').val()
                                }
                            },
                            delay: 500,
                        }
                    }
                }
            }
        }
        return this.bootstrapValidator(validOption);
    }

    //  添加分类
    $.fn.addCategory = function (url) {
        return this.click(function () {
            $('#add-modal').modal({
                backdrop : 'static'
            });
            $('#addCategory').remote(url);
        });
    }
    //  编辑分类
    $.fn.editCategory = function (url) {
        var $modal = $('#edit-modal');
        return this.on('click', function () {
            var $this = $(this);
            var categoryName = $this.parents('tr').find('td').eq(0).find('a').html();
            var categoryDescribe = $this.parents('tr').find('td').eq(1).html();
            $modal.find('[name="name"]').val(categoryName);
            $modal.find('[name="describe"]').val(categoryDescribe);
            $modal.find('[name="id"]').val($this.attr('id'));
            $modal.modal({
                backdrop : 'static'
            });
            var id = $modal.find('[name="id"]').val();
            $('#editCategory').remote(url);
            return false;
        });
    }
    $('.add-btn').addCategory('/manage/story/storyAddCategoryExists');
    $('.edit-btn').editCategory('/manage/story/storyEditCategoryExists');

    $('.delete-btn').click(function () {
        var href = $(this).attr('href');
        layer.confirm('删除分类会清空该分类下的所有文章。<br>确认删除？', {
            title : ['警告！', 'font-size:18px; color:#CC6633;'],
            move : false,
            area : '400px'
        }, function () {
            window.location.href = href;
        });
        return false;
    });
});