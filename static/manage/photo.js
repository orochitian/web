$(function () {
    $.fn.remote = function (url) {
        var validOption = {
            // trigger : 'change',
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
    // 文件上传框
    var $uploader = $('#uploader');
    $uploader.fileinput({
        uploadUrl: '/manage/photo/category/cover',
        language : 'zh',
        allowedPreviewTypes : [ 'image' ],
        allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
        maxFileSize : 500,
        maxFilesNum : 1,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        overwriteInitial: false,
        msgUploadError : '上传失败',
        autoReplace : true,
        showUpload : false,
        layoutTemplates : {
            actionDelete : '',
            actionUpload : ''
        }
    });
    $uploader.on('fileuploaded', function (event, data, previewId, index) {
        var addCategory = $('#addCategory');
        addCategory.find('[name="imgPath"]').val(data.response.path);
        addCategory.find('[name="imgName"]').val(data.response.name);
        addCategory.find('[name="imgSize"]').val(data.response.size);
        addCategory.find('[name="imgHash"]').val(data.response.hash);
        setTimeout(function () {
            addCategory.data('bootstrapValidator').defaultSubmit();
        }, 500);
    });
    $('.btn-info:submit').on('click', function (e) {
        e.preventDefault();
        var toUpload = $('#addCategory').data('bootstrapValidator').validateField('name').isValidField('name');
        toUpload ? $uploader.fileinput('upload') : '';
    });
    //  关闭刷新整个模态框
    $('#add-modal').on('hide.bs.modal', function () {
        var $this = $(this);
        $this.find('[name="name"]').val('')
        $this.find('[name="describe"]').val('');
        $('#addCategory').data('bootstrapValidator').resetForm();
        $this.find('#uploader').fileinput('unlock').fileinput('clear');
    });
    //  添加相册
    $('.add-btn').click(function () {
        $('#add-modal').modal({
            backdrop : 'static'
        });
        $('#addCategory').remote('/manage/photo/addCategoryExists');
    });
    //  编辑相册
    $('.edit-btn').click(function () {
        var $modal = $('#edit-modal');
        var $this = $(this);
        $modal.find('[name="name"]').val( $this.attr('name') );
        $modal.find('[name="describe"]').val( $this.attr('describe') );
        $modal.find('[name="password"]').val( $this.attr('password') );
        $modal.find('[name="id"]').val( $this.attr('id') );
        $modal.find('[name="show"]').val( $this.attr('show') );
        $modal.modal({
            backdrop : 'static'
        });
        $('#editCategory').remote('/manage/photo/editCategoryExists');
    });
    $('.delete-btn').click(function () {
        var href = $(this).attr('href');
        layer.confirm('删除相册会同时删除该相册下的照片。<br>确认删除？', {
            title : ['警告！', 'font-size:18px; color:#CC6633;'],
            move : false,
            area : '400px'
        }, function () {
            window.location.href = href;
        });
        return false;
    });
});