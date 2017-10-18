$(function () {
    $('.story-add-btn').click(function () {
        $('#story-add-modal').modal({
            backdrop : 'static'
        });
    });

    $('.story-edit-btn').click(function () {
        var $this = $(this);
        var actionSrc = $this.attr('href');
        var categoryName = $this.parents('tr').find('td').eq(0).find('a').html();
        var categoryDescribe = $this.parents('tr').find('td').eq(1).html();
        $('#story-edit-modal').modal({
            backdrop : 'static'
        }).find('form').attr('action', actionSrc);
        $('#story-edit-modal').find('[name="name"]').val(categoryName);
        $('#story-edit-modal').find('[name="describe"]').val(categoryDescribe);
        return false;
    });
});