'use strict'

var $ = document.querySelector.bind(document)
var $all = document.querySelectorAll.bind(document)

function resetNav() {
    $('#navigation').style.display = ''
    $('#content-box').style.display = ''
    $('#collapse-nav-button').style.display = ''
    $('#expand-nav-button').style.display = ''
    $('#open-nav-button').style.display = ''
    $('#close-nav-button').style.display = ''
}

$('#collapse-nav-button').addEventListener('click', function() {
    $('#navigation').style.display = 'none'
    $('#collapse-nav-button').style.display = 'none'
    $('#expand-nav-button').style.display = 'block'
})

$('#expand-nav-button').addEventListener('click', resetNav)

$('#open-nav-button').addEventListener('click', function() {
    $('#navigation').style.display = 'block'
    $('#content-box').style.display = 'none'
    $('#open-nav-button').style.display = 'none'
    $('#close-nav-button').style.display = 'block'
})

$('#close-nav-button').addEventListener('click', resetNav)

var showTagsCheck = $('#show-tags')

function updateTags() {
    var dispstyle = showTagsCheck.checked ? 'inline' : 'none'
    $all('.tech-tag').forEach(function(anchor) {
        if (anchor.hash === window.location.hash) {
            anchor.classList.add('tech-hilite')
        } else {
            anchor.classList.remove('tech-hilite')
        }
        anchor.style.display = dispstyle
    })
}

if (showTagsCheck) {
    updateTags()
    window.addEventListener('hashchange', updateTags)
    showTagsCheck.addEventListener('change', updateTags)
}

// https://web.dev/bfcache/
window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        resetNav()
    }
})
