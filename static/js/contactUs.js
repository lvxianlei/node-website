$(function () {
    var $item = $("ul>li")
    var map = new BMap.Map('allmap');
    var point = new BMap.Point(116.425572, 40.029092);
    map.centerAndZoom(point, 12);
    var marker = new BMap.Marker(point);//创建标注
    map.addOverlay(marker);//方法addOverlay() 向地图中添加覆盖物

    var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: false
    });
    map.addControl(navigationControl);

    var label = new BMap.Label("\n" +
        "\n" +
        "欧昊集团(北京总部)<a target='_blank' href='http://api.map.baidu.com/place/detail?uid=a4fe0d041b369657c7effb7a&output=html&source=jsapi'>详情»</a>\n" +
        "\n" +
        "<br/><p>地址： \t北京市朝阳区北苑路甲1号 </p> ", { offset: new BMap.Size(-178, -110) });
    marker.setLabel(label);
    $item.click(function () {
        var index = $item.index(this);
        $(this).addClass("active").siblings().removeClass("active");
        // if (index === 1) {
        //     var point = new BMap.Point(116.425572, 40.029092);
        //     $('#end').val('北京欧昊总部');
        //     $('#start').val('')
        //     marker = new BMap.Marker(point);//创建标注
        //     map.addOverlay(marker);//方法addOverlay() 向地图中添加覆盖物
        //     label = new BMap.Label("\n" +
        //         "\n" +
        //         "欧昊集团(北京总部)<a target='_blank' href='http://api.map.baidu.com/place/detail?uid=a4fe0d041b369657c7effb7a&output=html&source=jsapi'>详情»</a>\n" +
        //         "\n" +
        //         "<br/><p>地址： \t北京市朝阳区北苑路甲1号 </p> ", { offset: new BMap.Size(-178, -110) });
        //     marker.setLabel(label);
        // } else 
        if (index === 1) {
            var point = new BMap.Point(121.541127, 31.271815);
            $('#end').val('欧昊集团（上海总部）');
            $('#start').val('')
            marker = new BMap.Marker(point);//创建标注
            map.addOverlay(marker);//方法addOverlay() 向地图中添加覆盖物
            label = new BMap.Label("\n" +
                "\n" +
                "欧昊集团（上海总部)\n" +
                "\n" +
                "<br/><p>地址：上海市杨浦区河间路235号碧桂园中心4幢</p> ", { offset: new BMap.Size(-178, -110) });
            marker.setLabel(label);
        } else if (index === 2) {
            var point = new BMap.Point(113.527257, 22.774937);
            $('#end').val('欧昊集团（在建）');
            $('#start').val('')
            marker = new BMap.Marker(point);//创建标注
            map.addOverlay(marker);//方法addOverlay() 向地图中添加覆盖物
            label = new BMap.Label("\n" +
                "\n" +
                "欧昊集团（在建）<a target='_blank' href='http://api.map.baidu.com/place/detail?uid=cedd5a37ff625359ee74f85a&output=html&source=jsapi'>详情»</a>\n" +
                "\n" +
                "<br/><p>地址：广州市南沙区灵山岛尖明珠湾起步区</p> ", { offset: new BMap.Size(-178, -110) });
            marker.setLabel(label);
        } else if (index === 0) {
            point = new BMap.Point(116.425572, 40.029092);
            $('#end').val('北京欧昊总部');
            $('#start').val('')
        }
        map.centerAndZoom(point, 12);
    })
    function chaxun () {
        map.clearOverlays();
        var zhongdian = document.getElementById("end").value;
        var qidian = document.getElementById("start").value;
        //从输入的起点到终点
        search(qidian, zhongdian, BMAP_DRIVING_POLICY_LEAST_DISTANCE);
        function search (start, end, route) {
            var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true }, policy: route });
            driving.search(start, end);
        }
    }
    $('.chaxun').click(function () {
        chaxun()
    })

})
