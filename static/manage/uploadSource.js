$(function () {
    var category = $('.panel-body').find('[name="category"]').val();
    var $uploader = $('#uploader');
    $.ajax({
        url : '/manage/uploadSource/get',
        type : 'post',
        success : function (data) {
            // 文件上传框
            $uploader.fileinput({
                // uploadUrl: '/manage/uploadSource/get',
                deleteUrl: '/manage/uploadSource/delete',
                language : 'zh',
                allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
                maxFileSize : 500,
                overwriteInitial : false,
                msgUploadError : '上传失败',
                autoReplace : true,
                showUpload : false,
                showBrowse : false,
                showRemove : false,
                showCaption : false,
                fileActionSettings : {
                    showDrag : false,
                },
                initialPreview : data.images,
                initialPreviewConfig : data.config
            });
        }
    });

    // $uploader.on('fileuploaded', function (event, data, previewId, index) {
    //     $.ajax({
    //         url : '/manage/photo/addPic',
    //         type : 'post',
    //         data : {
    //             category : category,
    //             path : data.response.path,
    //             name : data.response.name,
    //             size : data.response.size
    //         }
    //     });
    // });
});