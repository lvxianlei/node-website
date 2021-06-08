$(function () {
    var $item = $("ul>li>span")
    $item.click(function () {
        var index = $item.index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".content .jt_news").eq(index).show().siblings().hide();
        if (index != 0) {
            $('.line').css({'left': '113px'})
        } else {
            $('.line').css({'left': '-5px'})

        }
    })

})
