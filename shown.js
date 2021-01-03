function shownumber(x, y, value) {
    $thenumber = $('#numberceil' + x + y)
    $thenumber.css('background-color', getbgc(value))
    $thenumber.css('color', getc(value))
    $thenumber.text(value)
    $thenumber.animate({
        width: cellw,
        height: cellw,
        top: topposition(x, y),
        left: leftposition(x, y)

    }, 150)
}

function moveanimation(fromi, fromj, toi, tok) {
    $thenumber = $('#numberceil' + fromi + fromj)
    $thenumber.animate({
        top: topposition(toi, tok),
        left: leftposition(toi, tok)
    }, 300
    )
}