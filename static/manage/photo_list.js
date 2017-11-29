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
                allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
                maxFileSize : 500,
                overwriteInitial : false,
                msgUploadError : '上传失败',
                autoReplace : true,
                showUpload : true,
                fileActionSettings : {
                    showDrag : false,
                },
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

    $uploader.on('filebeforedelete', function() {
        return new Promise(function(resolve, reject) {
            layer.confirm('这是物理删除。<br>确认删除？', {
                title : ['警告！', 'font-size:18px; color:#CC6633;'],
                move : false,
                area : '400px'
            }, function () {
                resolve();
                layer.closeAll();
            });
        });
    });
});