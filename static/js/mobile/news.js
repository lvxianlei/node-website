var count = 2;
const type = window.location.href.split('/').pop()
const newItem = `
<a class="jt_news_item1" href="/news/<%= type %>/<%= id %>">
    <div>
        <p><%= title %></p>
        <p><%= publish_time %></p>
    </div>
    <div>
        <img src="/image/mobileImg/right.png" alt="">
    </div>
</a>
`;
$(function () {
    var $more = $('.more')
    var isLoaded = true
    $more.click(function (e) {
        if (isLoaded) {
            $.post('/news/pages', {
                current: count,
                type: type,
                limit: 10
            }, function (data) {
                if (data.length > 0) {
                    data.forEach(item => {
                        const templateHTML = ejs.render(newItem, { id: item.id, publish_time: item.publish_time, title: item.title, summary: item.summary, type: type })
                        $('.main').append(templateHTML)
                    })
                    count++;
                } else {
                    $more.addClass('hide')
                    isLoaded = false
                }
            })
        } else {
            return
        }
    })
})