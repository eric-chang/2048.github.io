documentwidth = window.screen.availWidth
documentlenth = window.screen.availHeight
containerw = 0.92 * documentwidth
cellw = 0.18 * documentwidth
cellspace = 0.04 * documentwidth

function topposition(i, j) {
    return cellspace + i * (cellw + cellspace)

}

function leftposition(i, j) {

    return cellspace + j * (cellw + cellspace)

}
function getbgc(number) {
    switch (number) {
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#9c0"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#09c"; break;
        case 4096: return "#a6c"; break;
        case 8192: return "#93c"; break;
    }

    return "black";
}

function getc(number) {
    if (number <= 4)
        return "#776e65";

    return "white";
}

function randomindex(boradnumber) {

    x = parseInt(Math.floor(Math.random() * 4))
    y = parseInt(Math.floor(Math.random() * 4))
    while (true) {
        if (boradnumber[x][y] == 0) {
            break
        }
        else {
            x = parseInt(Math.floor(Math.random() * 4))
            y = parseInt(Math.floor(Math.random() * 4))

        }

    }
    return [x, y]
}


function randomnumber() {
    return (parseInt(Math.floor(Math.random() * 2)) + 1) * 2

}

function isleftmove(boradnumber) {
    var flag = false
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (boradnumber[i][j - 1] == 0 || boradnumber[i][j - 1] == boradnumber[i][j]) {
                flag = true
            }
        }
    }
    return flag
}

function isrightmove(boradnumber) {
    var flag = false
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (boradnumber[i][j + 1] == 0 || boradnumber[i][j + 1] == boradnumber[i][j]) {
                flag = true
            }
        }
    }
    return flag
}
function isupmove(boradnumber) {
    var flag = false
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (boradnumber[i - 1][j] == 0 || boradnumber[i - 1][j] == boradnumber[i][j]) {
                flag = true
            }
        }
    }
    return flag
}

function isdownmove(boradnumber) {
    var flag = false
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (boradnumber[i + 1][j] == 0 || boradnumber[i + 1][j] == boradnumber[i][j]) {
                flag = true
            }
        }
    }
    return flag
}
function leftmove(boradnumber) {

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            for (var k = 0; k < j; k++) {
                if (isblockinH(k, j, i, boradnumber) && boradnumber[i][j] != 0) {
                    if (boradnumber[i][k] == 0) {
                        boradnumber[i][k] = boradnumber[i][j]
                        boradnumber[i][j] = 0
                        moveanimation(i, j, i, k)
                        continue
                        //移动位置
                    }
                    if (boradnumber[i][k] == boradnumber[i][j] && !boradconflict[i][k]) {
                        boradnumber[i][k] = boradnumber[i][k] * 2
                        boradnumber[i][j] = 0
                        score = score + boradnumber[i][k]
                        moveanimation(i, j, i, k)
                        boradconflict[i][k] = true
                        continue
                        //合并
                    }
                }
            }
        }
    }
    setTimeout('numbertoview(boradnumber)', 230)
    $('span').text(score)
}
function upmove(boradnumber) {

    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            for (var k = 0; k < i; k++) {
                if (isblockinV(k, i, j, boradnumber) && boradnumber[i][j] != 0) {
                    if (boradnumber[k][j] == 0) {
                        boradnumber[k][j] = boradnumber[i][j]
                        boradnumber[i][j] = 0
                        moveanimation(i, j, k, j)
                        continue
                        //移动位置
                    }
                    if (boradnumber[k][j] == boradnumber[i][j] && !boradconflict[k][j]) {
                        boradnumber[k][j] = boradnumber[k][j] * 2
                        boradnumber[i][j] = 0
                        score = score + boradnumber[k][j]
                        boradconflict[k][j] = true
                        moveanimation(i, j, k, j)
                        continue
                        //合并
                    }
                }
            }
        }
    }
    setTimeout('numbertoview(boradnumber)', 230)
    $('span').text(score)
}

function rightmove(boradnumber) {

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            for (var k = 3; k > j; k--) {
                if (isblockinH(j, k, i, boradnumber) && boradnumber[i][j] != 0) {
                    if (boradnumber[i][k] == 0) {
                        boradnumber[i][k] = boradnumber[i][j]
                        boradnumber[i][j] = 0
                        moveanimation(i, j, i, k)
                        continue
                        //移动位置
                    }
                    if (boradnumber[i][k] == boradnumber[i][j] && !boradconflict[i][k]) {
                        boradnumber[i][k] = boradnumber[i][k] * 2
                        boradnumber[i][j] = 0
                        score = score + boradnumber[i][k]
                        boradconflict[i][k] = true
                        moveanimation(i, j, i, k)
                        continue
                        //合并
                    }
                }
            }
        }
    }
    setTimeout('numbertoview(boradnumber)', 230)
    $('span').text(score)
}

function downmove(boradnumber) {

    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            for (var k = 3; k > i; k--) {
                if (isblockinV(i, k, j, boradnumber) && boradnumber[i][j] != 0) {
                    if (boradnumber[k][j] == 0) {
                        boradnumber[k][j] = boradnumber[i][j]
                        boradnumber[i][j] = 0
                        moveanimation(i, j, k, j)
                        continue
                        //移动位置
                    }
                    if (boradnumber[k][j] == boradnumber[i][j] && !boradconflict[k][j]) {
                        boradnumber[k][j] = boradnumber[k][j] * 2
                        boradnumber[i][j] = 0
                        score = score + boradnumber[k][j]
                        boradconflict[k][j] = true
                        moveanimation(i, j, k, j)
                        continue
                        //合并
                    }
                }
            }
        }
    }
    setTimeout('numbertoview(boradnumber)', 230)
    $('span').text(score)
}


function isblockinH(small, big, i, boradnumber) {
    if (small + 1 == big) {
        return true
    }
    else if (ismiddleblock(small, big, i, boradnumber)) {
        return true
    }
    function ismiddleblock(small, big, i, boradnumber) {
        for (var a = small + 1; a < big; a++) {
            if (boradnumber[i][a] != 0) {
                return false
            }
        }
        return true
    }
    return false
}

function isblockinV(small, big, j, boradnumber) {
    if (small + 1 == big) {
        return true
    }
    else if (ismiddleblock(small, big, j, boradnumber)) {
        return true
    }
    function ismiddleblock(small, big, j, boradnumber) {
        for (var a = small + 1; a < big; a++) {
            if (boradnumber[a][j] != 0) {
                return false
            }
        }
        return true
    }
    return false
}

function isgameover(boradnumber) {
    if ((isleftmove(boradnumber) || isrightmove(boradnumber) || isupmove(boradnumber) || isdownmove(boradnumber)) || isnotfull(boradnumber)) {
        return true
    }
    else {
        $("#gameOver").show(500);
        //alert('Game Over\n Your score is ' + score)
        //newgrid()
        endflag = true
        return false
    }

}

function isnotfull(boradnumber) {
    var flag = false
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (boradnumber[i][j] == 0) {
                flag = true
            }
        }
    }
    return flag
}