var boradnumber = []
var score = 0
var boradconflict = []

//console.log(boradnumber)
$(document).ready(function () {
    moblie()
    newgrid()

})

function moblie() {
    if (documentwidth > 500) {
        containerw = 500
        cellw = 100
        cellspace = 20
    }
    $('#gridcontainer').css('width', containerw - cellspace * 2)
    $('#gridcontainer').css('height', containerw - cellspace * 2)
    $('#gridcontainer').css('padding', cellspace)
    $('#gridcontainer').css('border-radius', cellspace / 1.2)
    $('.grid').css('width', cellw)
    $('.grid').css('height', cellw)
    $('.grid').css('border-radius', cellspace / 2 + 'px')


}

$(document).keydown(function (e) {
    e.preventDefault()
    switch (e.keyCode) {
        case 37:   //L
            if (isleftmove(boradnumber)) {
                leftmove(boradnumber)
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            else {
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            break;
        case 38:  //u
            if (isupmove(boradnumber)) {
                upmove(boradnumber)
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            else {
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            break;
        case 39:  //r
            if (isrightmove(boradnumber)) {
                rightmove(boradnumber)
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            else {
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            break;
        case 40:  //d
            if (isdownmove(boradnumber)) {
                downmove(boradnumber)
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            else {
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            break;


    }


})
document.addEventListener('touchstart', function (e) {
    sx = e.touches[0].pageX
    sy = e.touches[0].pageY
})
document.addEventListener('touchend', function (e) {
    var ex = e.changedTouches[0].pageX
    var ey = e.changedTouches[0].pageY
    var tox = ex - sx
    var toy = ey - sy
    console.log(tox, toy)
    if (Math.abs(tox) < documentwidth * 0.1 && Math.abs(toy) < documentwidth * 0.1) {
        return
    }

    if (Math.abs(tox) > Math.abs(toy)) {
        if (tox > 0) { //R

            if (isrightmove(boradnumber)) {
                rightmove(boradnumber)
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            else {
                newnumber(boradnumber)
                isgameover(boradnumber)
            }

        }
        else {//L

            if (isleftmove(boradnumber)) {
                leftmove(boradnumber)
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            else {
                newnumber(boradnumber)
                isgameover(boradnumber)
            }


        }
    }
    else {
        if (toy < 0) {//u

            if (isupmove(boradnumber)) {
                upmove(boradnumber)
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            else {
                newnumber(boradnumber)
                isgameover(boradnumber)
            }


        }
        else {//d
            if (isdownmove(boradnumber)) {
                downmove(boradnumber)
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
            else {
                newnumber(boradnumber)
                isgameover(boradnumber)
            }
        }

    }
})
function newgrid() {
    boradnumber = []
    for (let i = 0; i < 4; i++) {
        var boradline = []

        for (let j = 0; j < 4; j++) {
            boradline.push(0)

        }
        boradnumber.push(boradline)
    }
    boradconflict = []
    for (let i = 0; i < 4; i++) {
        var conflictline = []

        for (let j = 0; j < 4; j++) {
            conflictline.push(false)

        }
        boradconflict.push(conflictline)
    }
    $(".alert").css('display', 'none');
    score = 0
    $('span').text(score)
    placegrid()//初始化16个格子
    createceil()//初始化数字格子
    newnumber(boradnumber)
    newnumber(boradnumber)

}


function placegrid() {

    for (i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            var $gird = $('#grid' + i + j)
            $gird.css('top', topposition(i, j))
            $gird.css('left', leftposition(i, j))

        }

    }


}

function createceil() {

    numbertoview(boradnumber)

}

function numbertoview(boradnumber) {

    $('.numberceil').remove()
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            numberceilid = 'numberceil' + i + j
            $('#gridcontainer').append('<div class="numberceil" id=' + numberceilid + '></div>')
            var $numberceil = $('#' + numberceilid)
            if (boradnumber[i][j] == 0) {
                $numberceil.css('width', '0px')
                $numberceil.css('height', '0px')
                $numberceil.css('top', topposition(i, j) + cellw / 2)
                $numberceil.css('left', leftposition(i, j) + cellw / 2)
            }
            else {
                $numberceil.css('width', cellw)
                $numberceil.css('height', cellw)
                $numberceil.css('top', topposition(i, j))
                $numberceil.css('left', leftposition(i, j))
                $numberceil.text(boradnumber[i][j])
                $numberceil.css('background-color', getbgc(boradnumber[i][j]))
                $numberceil.css('color', getc(boradnumber[i][j]))
            }
        }
    }
    $('.numberceil').css('line-height', cellw + 'px')
    $('.numberceil').css('font-size', 0.6 * cellw + 'px')
    $('.numberceil').css('border-radius', cellspace / 2 + 'px')
    boradconflict = []
    for (let i = 0; i < 4; i++) {
        var conflictline = []

        for (let j = 0; j < 4; j++) {
            conflictline.push(false)

        }
        boradconflict.push(conflictline)
    }
}

function newnumber(boradnumber) {
    flag = false
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (boradnumber[i][j] == 0) {
                flag = true
            }
        }
    }
    if (flag) {

        index = randomindex(boradnumber)
        x = index[0]
        y = index[1]
        value = randomnumber()
        boradnumber[x][y] = value
        shownumber(x, y, value)
    }
    else {
        alert('Game Over\n Your score is ' + score)
        newgrid()
    }


}