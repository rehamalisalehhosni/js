var loader = document.getElementById('loader');
var container = document.getElementById('container');
var Game;
var tempalinenarray = [];
var fuTime, timefu2;
var newint;

(function() {
    loader.style.display = "block";
    loader.style.top = '0px';
    doMove(); // start animating

}());
function doMove() {
    loader.style.top = parseInt(loader.style.top) + 1 + 'px';
    if (loader.style.top == '140px') {
        clearTimeout(timeMove);
    } else {
        var timeMove = setTimeout(doMove, 10); // call doMove in 20msec
    }
}
function choose_alians(id) {
    var Alien = document.getElementById('alian_' + id);
    var alian_choose = document.getElementById('alian_choose');
    var alians_class = document.getElementsByClassName('alians')[0];
    var alians = alians_class.getElementsByTagName('li');
    alian_choose.setAttribute('value', id);
    for (var i = 0; i < alians.length; i++) {
        alians[i].removeAttribute('class');
    }
    Alien.setAttribute('class', 'choose');
}
//start game 
function StartGame() {
    var alian_choose = document.getElementById('alian_choose');
    var name = document.getElementById('name');
    if (alian_choose.value == '') {
        alian_choose.setAttribute('value', '1');
    }
    if (name.value == '') {
        var rq = document.getElementById('rq');
        name.setAttribute('class', 'req');
        rq.textContent = '  * required';
    } else {
        //name ,level,aliens,time,char,diedafter,score ,liveno
        StartGameContainer(name.value, 1, 13, 30000, alian_choose.value, 1, 0, 3, 60);
        var lvl1Song = document.getElementById('lvl1Theme');
        lvl1Song.load();
        lvl1Song.play();
        level();//display level
        life();//display level
        
    }
}
//start leve
var objAliens = function(User, score, level, noAliens, time, Char, diedAfter, livesNo, timemovein3px) {
    var gameAttriebute = {
        username: User,
        score: score,
        lives: livesNo,
        time: time,
        charName: Char,
        levels: {
            Nolevel: level,
            noAliens: noAliens,
            timemovein3px: timemovein3px,
            diedAfter: diedAfter,
            Aliens: []
        }
    };
    for (var i = 0; i < noAliens; i++) {
        var randpixelinsec = Math.floor(Math.random() * 200) + timemovein3px;
        var is = i + 1;
        var alien = {
            id: i + 1,
            live: true,
            maxpixelmoveinsec: randpixelinsec,
            displayAlians: 0,
            timeMoveInt: "timeMoveInt" + is,
            created: false,
            noClick: 0
        };
        gameAttriebute.levels.Aliens.push(alien);
    }
    return gameAttriebute;
}
function rest() {
    console.log('d');
//    clearInterval(timefu2);
//    clearInterval(newint);
    var aliens = document.getElementById('aliens');
    var div_d = aliens.getElementsByTagName('div');
    for (var i = 0; i < Game.levels.Aliens.length; i++) {
     if(Game.levels.Aliens[i].live==true){
        clearInterval(Game.levels.Aliens[i].timeMoveInt);
     }
    }
//    for (var i = 0; i < div_d.length; i++) {
//        div_d[i].remove();
//    }
    aliens.innerHTML = '';
    Game.levels.Aliens = [];
    tempalinenarray = [];
     var aliens = document.getElementById('aliens');
    var div_d = aliens.getElementsByTagName('div');
    Game = {};

}

function StartGameContainer(User, level, noAliens, time, Char, diedAfter, score, lives, timemovein3px) {
    var alinc = 0;
        if(aliens.innerHTML!=''){
        rest();
    }
    if (loader.html != '') {
        loader.remove();
        container.style.display = 'block';
    }
    Game = objAliens(User, score, level, noAliens, time, Char, diedAfter, lives, timemovein3px);
     newint= setInterval(function() {
        if (tempalinenarray.length == Game.levels.Aliens.length&&Game.levels.Aliens.length!=0) {
            clearInterval(newint);
        } else {
            if (alinc >= Game.levels.Aliens.length) {
                alinc = 0;
            }
//        console.log(Game.levels.Nolevel);
            createAliansData(alinc);
            alinc++;
        }
    }, 2000);
    starttime();
}
function getAlienImg(char) {
    if (char == 1) {
        var img = "char1.gif";
    } else if (char == 2) {
        var img = "char2.gif";
    }
    return img;
}
function startpoints(length) {
    var container = document.getElementById('container');
    var position = container.getBoundingClientRect();
    var lpos = position.left;
    var tpos = position.top;
    var height = position.height;
    var width = position.width;
    var Fullwidth = position.width + position.left;
    var Fullheight = position.height + position.top;
    var point = [];
    for (var i = 0; i < length / 2; i++) {
        var x = Math.floor(Math.random() * (Fullheight / 2));
        var objPos = {
            top: parseInt(x), left: lpos - 60, name: 'firsthalfTopleft0'
        }
        point.push(objPos);
    }
    for (var i = length / 2; i < length; i++) {
        var x = Math.floor(Math.random() * (Fullwidth / 2));
        var objPos = {
            top: tpos + 10, left: parseInt(x), name: 'firsthalfleftTop0'
        }
        point.push(objPos);
    }
    return point;
}
function createAliansData(cur) {
    var aliensHtml = document.getElementById('aliens');
    var length = Game.levels.Aliens.length;
    var startpoint = startpoints(length);
    var pointLen = startpoint.length;
    var alienimg = getAlienImg(Game.charName);
    var start = Math.floor(Math.random() * (pointLen - 1));
    if (Game.levels.Aliens[cur].created == false) {
        //    for (var i=0;i<length;i++){
        var style = "style='display:none;top:" + startpoint[start].top + "px;left:" + startpoint[start].left + "px;'";
        var codeAlien = "<div id='alian_" + Game.levels.Aliens[cur].id + "' onclick='alienOperations(" + Game.levels.Aliens[cur].id + ")' " + style + "><img src='img/" + alienimg + "' /></div>";
        aliensHtml.innerHTML += codeAlien;
        Game.levels.Aliens[cur].startPostion = startpoint[start].name;
        Game.levels.Aliens[cur].startPointtop = startpoint[start].top;
        Game.levels.Aliens[cur].startPointleft = startpoint[start].left;
        Game.levels.Aliens[cur].created = true;
        SetMovDirection(cur);
    } else if (Game.levels.Aliens[cur].live == true) {
        var x = "alian_" + Game.levels.Aliens[cur].id;
        var e = document.getElementById(x);
        var style = "display:none;top:" + startpoint[start].top + "px;left:" + startpoint[start].left + "px;";
        e.setAttribute('style', style);
        Game.levels.Aliens[cur].startPostion = startpoint[start].name;
        Game.levels.Aliens[cur].startPointtop = startpoint[start].top;
        Game.levels.Aliens[cur].startPointleft = startpoint[start].left;
        SetMovDirection(cur);
    }
    //create Alians array of object and moved
}
function SetMovDirection(cur) {
    var aliensHtml = document.getElementById('aliens');
    var alian = aliensHtml.getElementsByTagName('div')[cur];
    var topPos = parseInt(alian.style.top);
    var leftPos = parseInt(alian.style.left);
    switch (Game.levels.Aliens[cur].startPostion) {
        case 'firsthalfleftTop0':
            movetoPositiondawn(cur);
            break;
        case 'firsthalfTopleft0':
            movetoPositionleft(cur);
            break;
    }

}
function containerPostion() {
    var position = container.getBoundingClientRect();
    var posC = {
        lpos: position.left,
        tpos: position.top,
        height: position.height,
        width: position.width,
        allw: position.left + position.width - 70,
        allh: position.top + position.height - 70,
    }
    return posC;
}
function movetoPositionleft(cur) {
    var aliensHtml = document.getElementById('aliens');
    var alianELE = aliensHtml.getElementsByTagName('div')[cur];
    alianELE.style.display = "block";
    var arrC = [];
//    alianELE.style.top = parseInt(alianELE.style.top) + 70+'px';
    var obja = {
        top: 0,
        left: 5,
    };
    arrC.push(obja);
    obja = {
        top: 5,
        left: 5,
    }
    arrC.push(obja);
    var sel = Math.floor(Math.random() * 2);
    Game.levels.Aliens[cur].timeMoveInt = setInterval(function() {
        MoveAlien(arrC[sel], cur);
    }, Game.levels.Aliens[cur].maxpixelmoveinsec);
}
function movetoPositiondawn(cur) {
    var aliensHtml = document.getElementById('aliens');
    var alianELE = aliensHtml.getElementsByTagName('div')[cur];
    alianELE.style.display = "block";
    var arrC = []
//     alianELE.style.top = parseInt(alianELE.style.top) + 70+'px';
//     alianELE.style.left = parseInt(alianELE.style.left) - 70+'px';
    var obja = {
        top: 5,
        left: 0,
    };
    arrC.push(obja);
    obja = {
        top: 5,
        left: 5,
    }
    arrC.push(obja);
    var sel = Math.floor(Math.random() * 2);

    Game.levels.Aliens[cur].timeMoveInt  = setInterval(function() {
        MoveAlien(arrC[sel], cur);
    }, Game.levels.Aliens[cur].maxpixelmoveinsec);
//    createAliansData(cur+1);
}
function MoveAlien(dir, cur) {
    var containerPos = containerPostion();
    var aliensHtml = document.getElementById('aliens');
    var alianELE = aliensHtml.getElementsByTagName('div')[cur];
    if (parseInt(alianELE.style.left) < containerPos.allw && parseInt(alianELE.style.top) < containerPos.allh) {
        alianELE.style.top = parseInt(alianELE.style.top) + dir.top + 'px';
        alianELE.style.left = parseInt(alianELE.style.left) + dir.left + 'px';
    } else {
        Game.levels.Aliens[cur].displayAlians = 0;
        alianELE.style.display = "none";
        clearInterval(Game.levels.Aliens[cur].timeMoveInt);
    }
}

