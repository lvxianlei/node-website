var partygovernment_count = 1;
var publicservice_count = 1;
const partygovernmentTemplate = `
    <% for(let i = 0; i < partygovernment.length; i++ ) { %>
    <div class="partyItem">
        <a href="/news/partygovernment/<%= partygovernment[i].id %>"
            target="_blank"><%= partygovernment[i].title %></a>
        <p><%= partygovernment[i].summary %></p>
    </div>
    <% } %>
`;
const publicserviceTemplate = `
    <% for(let i = 0; i < publicservice.length; i++ ) { %>
    <div class="partyItem">
        <a href="/news/publicservice/<%= publicservice[i].id %>"
            target="_blank"><%= publicservice[i].title %></a>
        <p><%= publicservice[i].summary %></p>
    </div>
    <% } %>
`;
$(function () {
    $('.partygovernment').children('img.left').click(function () {
        if (partygovernment_count <= 1) {
            partygovernment_count = 1
            return
        } else {
            partygovernment_count--;
        }
        $(this).siblings('p').removeClass('active').eq(partygovernment_count - 1).addClass('active')
        $.post('/news/pages', {
            current: partygovernment_count,
            type: "partygovernment"
        }, function (data) {
            const templateHTML = ejs.render(partygovernmentTemplate, { partygovernment: data })
            $('.partyLeft.partygovernment').html(templateHTML)
        })
    })

    $('.partygovernment').children('img.right').click(function () {
        if (partygovernment_count >= $('.partygovernment').attr('data-pages')) {
            partygovernment_count = $('.partygovernment').attr('data-pages')
            return
        } else {
            partygovernment_count++;
        }
        $(this).siblings('p').removeClass('active').eq(partygovernment_count - 1).addClass('active')
        $.post('/news/pages', {
            current: partygovernment_count,
            type: "partygovernment"
        }, function (data) {
            const templateHTML = ejs.render(partygovernmentTemplate, { partygovernment: data })
            $('.partyLeft.partygovernment').html(templateHTML)
        })
    })

    $('.partygovernment').children('p').click(function (event) {
        partygovernment_count = event.target.innerText
        $(this).addClass('active').siblings().removeClass('active')
        $.post('/news/pages', {
            current: partygovernment_count,
            type: "partygovernment"
        }, function (data) {
            const templateHTML = ejs.render(partygovernmentTemplate, { partygovernment: data })
            $('.partyLeft.partygovernment').html(templateHTML)
        })
    })

    $('.publicservice').children('img.left').click(function () {
        if (publicservice_count <= 1) {
            publicservice_count = 1;
            return
        } else {
            publicservice_count--;
        }
        $(this).siblings('p').removeClass('active').eq(partygovernment_count - 1).addClass('active')
        $.post('/news/pages', {
            current: publicservice_count,
            type: "publicservice"
        }, function (data) {
            const templateHTML = ejs.render(publicserviceTemplate, { publicservice: data })
            $('.partyLeft.publicservice').html(templateHTML)
        })
    })

    $('.publicservice').children('img.right').click(function () {
        if (publicservice_count >= $('.publicservice').attr('data-pages')) {
            publicservice_count = $('.publicservice').attr('data-pages')
            return
        } else {
            publicservice_count++;
        }
        $(this).siblings('p').removeClass('active').eq(partygovernment_count - 1).addClass('active')
        $.post('/news/pages', {
            current: publicservice_count,
            type: "publicservice"
        }, function (data) {
            const templateHTML = ejs.render(publicserviceTemplate, { publicservice: data })
            $('.partyLeft.publicservice').html(templateHTML)
        })
    })

    $('.publicservice').children('p').click(function (event) {
        publicservice_count = event.target.innerText
        $(this).addClass('active').siblings().removeClass('active')
        $.post('/news/pages', {
            current: publicservice_count,
            type: "publicservice"
        }, function (data) {
            const templateHTML = ejs.render(publicserviceTemplate, { publicservice: data })
            $('.partyLeft.publicservice').html(templateHTML)
        })
    })

})