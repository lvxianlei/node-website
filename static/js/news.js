var count = 2;
const type = window.location.href.split('/').pop()
const newItem = `
<a class="jt_news_item1" href="/news/<%= type %>/<%= id %>" target="_blank">
    <div class="jt_news_itemMain">
        <div class="left">
            <% for(let j=0; j < publish_time.split(" ").length; j++) { %>
                <p>
                    <%= publish_time.split(" ")[j]%>
                </p>
                <% }%>
        </div>
        <div class="right">
            <h2>
                <%= title%>
            </h2>
            <p>
                <%= summary%>
            </p>
        </div>
    </div>
</a>`;
$(function () {
    var $item = $("ul>li>span")
    var isLoaded = true
    $item.click(function () {
        var index = $item.index(this);
        $(this).addClass("active").siblings().removeClass("active");
        $(".content .jt_news").eq(index).show().siblings().hide();
        if (index != 0) {
            $('.line').css({ 'left': '113px' })
        } else {
            $('.line').css({ 'left': '-5px' })
        }
    })
    var $more = $('.more')
    $more.click(function (e) {
        if (isLoaded) {
            $.post('/news/pages', {
                current: count,
                type: type,
                limit: 3
            }, function (data) {
                data.forEach(item => {
                    const templateHTML = ejs.render(newItem, { id: item.id, publish_time: item.publish_time, title: item.title, summary: item.summary, type: type })
                    $('.jt_news').append(templateHTML)
                })
                count++;
            })
        }
    })
})