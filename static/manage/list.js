$(function () {
    $('.delete-btn').click(function () {
        var href = $(this).attr('href');
        layer.confirm('文章删除后将无法恢复。<br>确认删除？', {
            title : ['警告！', 'font-size:18px; color:#CC6633;'],
            move : false,
            area : '400px'
        }, function () {
            window.location.href = href;
        });
        return false;
    });
});