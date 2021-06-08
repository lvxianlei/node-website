/*轮播*/
var mySwiper = new Swiper('.swiper-container', {
     autoplay:true,
    observer: true, //修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, //修改swiper的父元素时，自动初始化swiper
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})
/*tab*/
$(function () {
    var $item = $(".articleRight_title>span")
    $item.click(function(){
        var index = $item.index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".articleRight_info .item1").eq(index).show().siblings().hide();
        if(index!=0){
            $('.line').css({'left':'106px','width':'92px'})
        }else{
            $('.line').css({'left':'0px','width':'62px'})

        }
    })
})
