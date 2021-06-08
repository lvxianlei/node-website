$(function () {
    $('.year').on('click', 'li', function () {
        $(this).addClass('select').siblings().removeClass('select')
        var index = $(this).index()
        console.log(index);
        $('.memorabilia_content .content').eq(index).show().siblings().hide()

    })
})