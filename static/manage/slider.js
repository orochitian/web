$(function () {
    $('#addCategory').bootstrapValidator({
        // trigger : 'change',
        //  验证字段
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            image: {
                validators: {
                    notEmpty: {
                        message: '没图你传个鸡巴。'
                    }
                }
            }
        }
    });
    //  添加轮播
    $.fn.addCategory = function (url) {
        return this.click(function () {
            $('#add-modal').modal({
                backdrop : 'static'
            });
        });
    }
    //  关闭刷新整个模态框
    $('#add-modal').on('hidden.bs.modal', function () {
        var $this = $(this);
        $this.find('[name="title"]').val() ? $this.find('[name="title"]').val('') : '';
        $this.find('[name="describe"]').val() ? $this.find('[name="describe"]').val('') : '';
        $this.find('#uploader').fileinput('unlock').fileinput('clear');
    });
    $('[type="submit"]').click(function () {
        console.log($('#uploader').val());
        return false;
    });
    //  编辑分类
    $.fn.editCategory = function (url) {
        var $modal = $('#edit-modal');
        return this.on('click', function () {
            var $this = $(this);
            $modal.find('[name="name"]').val( $this.attr('name') );
            $modal.find('[name="describe"]').val( $this.attr('describe') );
            $modal.find('[name="password"]').val( $this.attr('password') );
            $modal.find('[name="id"]').val( $this.attr('id') );
            $modal.modal({
                backdrop : 'static'
            });
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