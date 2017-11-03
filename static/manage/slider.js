$(function () {
    // 文件上传框
    var $uploader = $('#uploader');
    $uploader.fileinput({
        uploadUrl: 'http://127.0.0.1:8080/manage/slide/upload',
        language : 'zh',
        allowedPreviewTypes : [ 'image' ],
        allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
        maxFileSize : 5000,
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
            addCategory.submit();
        }, 500);
    });
    $('.btn-info:submit').on('click', function (e) {
        e.preventDefault();
        $uploader.fileinput('upload');
    });
    //  关闭刷新整个模态框
    $('#add-modal').on('hidden.bs.modal', function () {
        var $this = $(this);
        $this.find('[name="title"]').val('')
        $this.find('[name="describe"]').val('')
        $this.find('#uploader').fileinput('unlock').fileinput('clear');
    });
    //  添加轮播
    $('.add-btn').click(function () {
        $('#add-modal').modal({
            backdrop : 'static'
        });
    });
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
});