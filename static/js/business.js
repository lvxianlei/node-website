$(function () {
    $('.item1,.bus_img').mouseover(function () {
        $(this).find('.left_top').hide()
        $(this).find('.cover').show()
    }).mouseout(function () {
        $('.left_top').show()
        $('.cover').hide()
    })

    $('.financial-item').mouseover(function () {
        $(this).find('.cover').show()
    }).mouseout(function () {
        $('.cover').hide()
    })

    $(function () {
        $('.content1 .item,.content2 .item,.content6 .item').on('click', '.item1,.bus_img', function (event) {
            $(this).find('.itemDetail').css('display', 'flex')
            $(this).find('.bus_img').find('.itemDetail').css('display', 'flex')
            $(document).on("click",
                function () {
                    //对document绑定一个影藏Div方法
                    $('.content1 .item .itemDetail,.content2 .item1 .itemDetail,.content6 .item1 .itemDetail').hide();
                });
            event.stopPropagation();//阻止事件向上冒泡
            $(this).find('.itemDetail').click(function (event) {
                event.stopPropagation(); //阻止事件向上冒泡
            });
        })
        $('.content4 .item').on('click', '.provinces', function (event) {
            $(this).parents('.cover').siblings().css('display', 'flex')
            $(document).on("click",
                function () {
                    //对document绑定一个影藏Div方法
                    $('.content4 .item1 .itemContent').hide();
                });
            event.stopPropagation();//阻止事件向上冒泡
            $(this).find('.itemContent').click(function (event) {
                event.stopPropagation(); //阻止事件向上冒泡
            });
        })
    })
})