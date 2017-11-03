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
    $.fn.addCategory = function () {
        return this.click(function () {
            $('#add-modal').modal({
                backdrop : 'static'
            });
            $('#addCategory').remote(this);
            return false;
        });
    }
    //  编辑分类
    $.fn.editCategory = function (url) {
        var $modal = $('#edit-modal');
        return this.on('click', function () {
            var $this = $(this);
            $modal.find('[name="name"]').val( $this.attr('name') );
            $modal.find('[name="describe"]').val( $this.attr('describe') );
            $modal.find('[name="password"]').val( $this.attr('password') );
            $modal.find('[name="id"]').val( $this.attr('id') );
            $modal.find('[name="show"]').val( $this.attr('show') );
            $modal.modal({
                backdrop : 'static'
            });
            $('#editCategory').remote(this);
            return false;
        });
    }

    $('.add-btn').addCategory();
    $('.edit-btn').editCategory();

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