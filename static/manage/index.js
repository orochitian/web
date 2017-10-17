$(function () {
    $('.welcome-edit').click(function () {
        $(this).addClass('hidden').siblings('button').removeClass('hidden');
        $('.welcome-text').addClass('hidden');
        $('.welcome-input').removeClass('hidden');
    });
    $('.welcome-cancel').click(function () {
        $(this).addClass('hidden').siblings('button').addClass('hidden').siblings('.welcome-edit').removeClass('hidden');
        $('.welcome-text').removeClass('hidden');
        $('.welcome-input').addClass('hidden');
    });
});
