var mapHrefs = {
    "百度地图": {
        shunde: "http://api.map.baidu.com/geocoder?address=欧昊集团顺德总部&location=113.274895,22.928572&coord_type=bd09ll&output=html&src=webapp.baidu.欧昊官网",
        beijing: "http://api.map.baidu.com/geocoder?address=欧昊集团北京总部&location=116.425572,40.029092&coord_type=bd09ll&output=html&src=webapp.baidu.欧昊官网",
        shanghai: "http://api.map.baidu.com/geocoder?address=上海市杨浦区河间路235号碧桂园中心4号&location=121.540592,31.272197&coord_type=bd09ll&output=html&src=webapp.baidu.欧昊官网",
        guangzhou: "http://api.map.baidu.com/geocoder?address=欧昊集团总部大楼&location=113.527247,22.774938&coord_type=bd09ll&output=html&src=webapp.baidu.欧昊官网"
    },
    "腾讯地图": {
        shunde: " https://apis.map.qq.com/uri/v1/marker?marker=coord:22.922288,113.268441;title:欧昊集团顺德总部;&referer=欧昊官网-mobile",
        beijing: " https://apis.map.qq.com/uri/v1/marker?marker=coord:40.022878,116.418381;title:欧昊集团北京总部;&referer=欧昊官网-mobile",
        shanghai: " https://apis.map.qq.com/uri/v1/marker?marker=coord:31.266639,121.533761;title:欧昊集团上海总部;addr:上海市杨浦区河间路235号碧桂园中心4号&referer=欧昊官网-mobile",
        guangzhou: " https://apis.map.qq.com/uri/v1/marker?marker=coord:22.768671,113.520926;title:欧昊集团总部大楼;&referer=欧昊官网-mobile"
    },
    "高德地图": {
        shunde: "https://uri.amap.com/marker?position=113.268441,22.922457&name=欧昊集团顺德总部&callnative=1",
        beijing: "https://uri.amap.com/marker?position=116.419133,40.023120&name=欧昊集团北京总部&callnative=1",
        shanghai: "https://uri.amap.com/marker?position=121.513736,31.228666&name=上海市杨浦区河间路235号碧桂园中心4号&callnative=1",
        guangzhou: "https://uri.amap.com/marker?position=113.521038,22.768584&name=欧昊集团总部大楼&callnative=1"
    }
}

function touchmoveEvent(e) {
    e.preventDefault();
}

$(function () {
    var $more = $('.company .adress')
    var $botton = $('.model .btn')
    var clickLi = ''
    $more.click(function (e) {
        $('.model-warp').removeClass('hide')
        document.body.addEventListener('touchmove', touchmoveEvent, { passive: false })
        $('body').css('overflow', 'hidden')
        clickLi = e.target.dataset.adress
    })

    $('.model-warp').click(function (e) {
        $('.model-warp').addClass('hide')
        document.body.removeEventListener('touchmove', touchmoveEvent, { passive: false });
        $('body').css('overflow', 'auto')
    })

    $botton.click(function (e) {
        e.stopPropagation()
        var chooseMap = $(e.target).text()
        window.location.href = mapHrefs[chooseMap][clickLi]
        clickLi = ''
        $('.model-warp').addClass('hide')
        document.body.removeEventListener('touchmove', touchmoveEvent, { passive: false });
        $('body').css('overflow', 'auto')
    })
})