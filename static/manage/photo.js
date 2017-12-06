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
    $('#add-modal').find('.btn-info:submit').on('click', function (e) {
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
        $modal.find('[name="id"]').val( $this.attr('id') );
        $modal.find('[name="show"]').val( $this.attr('show') );
        $modal.modal({
            backdrop : 'static'
        });
        $.ajax({
            url : '/manage/photo/edit/getImg',
            data : {
                sid : $modal.find('[name="id"]').val()
            },
            type : 'post',
            success : function (data) {
                // 文件上传框
                $('#uploader1').fileinput({
                    uploadUrl: '/manage/photo/category/cover',
                    language : 'zh',
                    allowedPreviewTypes : [ 'image' ],
                    allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
                    maxFileSize : 500,
                    overwriteInitial : true,
                    msgUploadError : '上传失败',
                    autoReplace : true,
                    showUpload : false,
                    showRemove : false,
                    fileActionSettings : {
                        showDrag : false,
                        showDelete : false
                    },
                    layoutTemplates : {
                        actionUpload : ''
                    },
                    initialPreview : '<img class="file-preview-image" src="'+data.imgPath+'" >',
                    initialPreviewConfig : [
                        {
                            caption : data.imgName,
                            size : data.imgSize,
                        }
                    ]
                });
                //  预览初始化完成后填入预览图片的信息，如果此次更新没有重新上传图片，则使用该信息作为默认。
                $modal.find('[name="imgPath"]').val(data.imgPath);
                $modal.find('[name="imgName"]').val(data.imgName);
                $modal.find('[name="imgSize"]').val(data.imgSize);
                $modal.find('[name="imgHash"]').val(data.imgHash);
            }
        });
        $('#editCategory').remote('/manage/photo/editCategoryExists');
    });
    $('#edit-modal').on('fileuploaded', function (event, data, previewId, index) {
        var editCategory = $('#editCategory');
        //  更新上传后的最新图片信息
        editCategory.find('[name="imgPath"]').val(data.response.path);
        editCategory.find('[name="imgName"]').val(data.response.name);
        editCategory.find('[name="imgSize"]').val(data.response.size);
        editCategory.find('[name="imgHash"]').val(data.response.hash);
        setTimeout(function () {
            editCategory.submit();
        }, 500);
    });
    $('#edit-modal').find('.btn-info:submit').on('click', function (e) {
        e.preventDefault();
        //  getFrames方法，获取当前图片预览区存在的图片frame，包含预览图。
        //  返回值为：Array。由于是单图上传，所以length大于1表示有重新上传图片。否则不上传，直接更新其他字段。
        if( $('#uploader1').fileinput('getFilesCount') > 0 ) {
            $('#uploader1').fileinput('upload');
        } else {
            setTimeout(function () {
                $('#editCategory').submit();
            }, 100);
        }
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