var count = 2;
const newItem = `<div class="recruitment">
<div class="recruitment_left">
    <h2><%=post_name %></h2>
    <div class="recruitment_left_message">
        <div class="recruitment_left_message_address">
            <img src="image/join_place.jpg">
            <p><%=work_city %></p>
        </div>
        <p><%=company %></p>
        <p><%=post_category %></p>
        <p>招聘<%=num %>人</p>
    </div>
    <div class="recruitment_left_message_date">
        <img src="image/join_time.jpg">
        <p>发布于<%=publish_time %></p>
    </div>
</div>
<div class="recruitment_detail">
    <div class="recruitment_right">
        <a href="/joinUs/<%= id %>" target="_blank">点击查看详情</a>
    </div>
</div>
</div>`;
$(function () {
    var $item = $("ul>li>span")
    $item.click(function () {
        var index = $item.index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".content .join_news").eq(index).show().siblings().hide();
        if (index != 0) {
            $('.line').css({ 'left': '83px' })
        } else {
            $('.line').css({ 'left': '-2px' })
        }
    })
    $('.joinUs_main ul>li').click(function () {
        $(this).parent().siblings('.join').hide().siblings('.content').find('.recruitment').show().siblings('.join_news_info').hide()
    })

    $(".formats a").click(function () {
        $(this).addClass('formats_active').siblings().removeClass('formats_active')
    })

    // $('.seeMore').click(function () {
    //     $.post('/joinUs/pages', {
    //         current: count,
    //     }, function (data) {
    //         data.forEach(item => {
    //             const templateHTML = ejs.render(newItem, { ...item })
    //             $('.join_news_main').append(templateHTML)
    //         })
    //         count++;
    //     })
    // })
});