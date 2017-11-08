$(function () {
    var category = $('.panel-body').find('[name="category"]').val();
    var $uploader = $('#uploader');
    $.ajax({
        url : '/manage/photo/getPic',
        type : 'post',
        data : {
            category : category
        },
        success : function (data) {
            // 文件上传框
            $uploader.fileinput({
                uploadUrl: '/manage/photo/picUpload',
                deleteUrl: '/manage/photo/picDelete',
                language : 'zh',
                allowedPreviewTypes : [ 'image' ],
                allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
                maxFileSize : 500,
                maxFilesNum : 1,
                overwriteInitial : false,
                previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                msgUploadError : '上传失败',
                autoReplace : true,
                showUpload : true,
                initialPreview : data.images,
                initialPreviewConfig : data.config
            });
        }
    });

    $uploader.on('fileuploaded', function (event, data, previewId, index) {
        $.ajax({
            url : '/manage/photo/addPic',
            type : 'post',
            data : {
                category : category,
                path : data.response.path,
                name : data.response.name,
                size : data.response.size
            }
        });
    });
});