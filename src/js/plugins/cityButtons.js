import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes.js'

const duration = 600

function filterByCity(city) {
    $('[wm-city]').each(function (i, e) {
        const isTarget = $(this).attr('wm-city') === city || city === null
        if (isTarget) {
            $(this).fadeIn(duration)
            $(this).parent().removeClass('d-none')
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

function desactiveElements(btnSelected) {
    $('button').each(function (i, e) {
        if (e !== btnSelected) {
            $(e).removeClass('active')
        }
    })
}

$.fn.cityButtons = function () {
    const cities = new Set
    $('[wm-city]').each(function (i, e) {
        cities.add($(e).attr('wm-city'))
    })

    const btns = Array.from(cities).map(city => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info'])
            .html(city)
        btn.click(function (e) {
            filterByCity(city)
            $(this).addClass('active')
            desactiveElements(this)
        })
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(function (e) {
        filterByCity(null)
        desactiveElements(null)
        $(this).addClass('active')
    })
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    this.html(btnGroup)
    return this
}

onLoadHtmlSuccess(function () {
    $('[wm-city-buttons').cityButtons()
})