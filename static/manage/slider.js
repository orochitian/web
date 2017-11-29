$(function () {
    // 文件上传框
    var $uploader = $('#uploader');
    $uploader.fileinput({
        uploadUrl: '/manage/slide/upload',
        language : 'zh',
        allowedPreviewTypes : [ 'image' ],
        allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
        maxFileSize : 500,
        msgUploadError : '上传失败',
        autoReplace : true,
        showUpload : false,
        //  取消文件独立的上传与删除按钮
        layoutTemplates : {
            actionDelete : '',
            actionUpload : ''
        }
    });
    //  上传成功后提交表单
    $uploader.on('fileuploaded', function (event, data, previewId, index) {
        var addCategory = $('#addCategory');
        addCategory.find('[name="imgPath"]').val(data.response.path);
        addCategory.find('[name="imgName"]').val(data.response.name);
        addCategory.find('[name="imgSize"]').val(data.response.size);
        addCategory.find('[name="imgHash"]').val(data.response.hash);
        setTimeout(function () {
            addCategory.submit();
        }, 500);
    });
    //  取消submit按钮默认事件，改为上传文件
    $('#add-modal').find('.btn-info:submit').on('click', function (e) {
        e.preventDefault();
        $uploader.fileinput('upload');
    });
    //  关闭刷新整个模态框
    $('#add-modal').on('hidden.bs.modal', function () {
        var $this = $(this);
        $this.find('[name="title"]').val('');
        $this.find('[name="describe"]').val('');
        $this.find('#uploader').fileinput('unlock').fileinput('clear');
    });
    $('#edit-modal').on('hidden.bs.modal', function () {
        var $this = $(this);
        $this.find('[name="title"]').val('');
        $this.find('[name="describe"]').val('');
        $this.find('[name="sid"]').val('');
        //  模态框关闭后，需要手动销毁fileinput，否则无法更新当前编辑项的图片预览。
        $this.find('#uploader2').fileinput('destroy');
    });
    //  添加轮播
    $('.add-btn').click(function () {
        $('#add-modal').modal({
            backdrop : 'static'
        });
    });
    //  删除轮播
    $('.delete-btn').click(function () {
        var href = $(this).attr('href');
        layer.confirm('删除轮播并不会同时删除图片。<br>确认删除？', {
            title : ['警告！', 'font-size:18px; color:#CC6633;'],
            move : false,
            area : '400px'
        }, function () {
            window.location.href = href;
        });
        return false;
    });

    var $uploader2 = $('#uploader2');
    //  编辑轮播
    $('.edit-btn').click(function () {
        var editModal = $('#edit-modal');
        editModal.modal({
            backdrop : 'static'
        }).find('[name="sid"]').val( $(this).attr('sid') );
        //  获取预览信息
        $.ajax({
            url : '/manage/slide/edit/getImg',
            data : {
                sid : editModal.find('[name="sid"]').val()
            },
            type : 'post',
            success : function (data) {
                // 文件上传框
                $uploader2.fileinput({
                    uploadUrl: '/manage/slide/upload',
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
                    initialPreview : '<img class="file-preview-image" src="'+data.path+'" >',
                    initialPreviewConfig : [
                        {
                            caption : data.name,
                            size : data.size,
                        }
                    ]
                });
                //  预览初始化完成后填入预览图片的信息，如果此次更新没有重新上传图片，则使用该信息作为默认。
                editModal.find('[name="title"]').val(data.title);
                editModal.find('[name="describe"]').val(data.describe);
                editModal.find('[name="imgPath"]').val(data.path);
                editModal.find('[name="imgName"]').val(data.name);
                editModal.find('[name="imgSize"]').val(data.size);
                editModal.find('[name="imgHash"]').val(data.hash);
            }
        });
    });

    $uploader2.on('fileuploaded', function (event, data, previewId, index) {
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
        if( $uploader2.fileinput('getFilesCount') > 0 ) {
            $uploader2.fileinput('upload');
        } else {
            editCategory.submit();
        }
    });
});