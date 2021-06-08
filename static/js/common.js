$('.nav > a').mouseover(function () {
    $('.nav > a').removeClass('bg')
    $(this).addClass('bg')
}).mouseout(function () {
    $('.nav').children().each(function (index, item) {
        if ($(item).attr('data-class') === 'bg') {
            $(item).addClass('bg')
        } else {
            $(item).removeClass('bg')
        }
    })
})