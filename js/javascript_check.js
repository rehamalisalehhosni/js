// Fathi
function alienOperations(id) {
    var click = Game.levels.Aliens[id - 1].noClick;
    click++;

    var shape = Game.levels.Aliens[id - 1].id;
    var x = "alian_" + shape;
    var a = document.getElementById(x);
    if (click == Game.levels.diedAfter) {
        a.setAttribute('style', 'display:none');
        var audio = new Audio('./audio/neck_snap.mp3');
        audio.play();
        Game.levels.Aliens[id - 1].live = false;
        //  incrementScore();
        tempalinenarray.push(id - 1);
        incrementScore();
        checkAlines();
    }
}

function checkAlines() {
    var aliens = document.getElementById('aliens');
    if (tempalinenarray.length == Game.levels.Aliens.length&&Game.levels.Aliens.length!=0) {
        clearInterval(timefu2);
        Game.levels.noAliens = Game.levels.noAliens + 5;
        Game.levels.Nolevel = Game.levels.Nolevel+1;
        Game.levels.timemovein3px = Game.levels.timemovein3px ;
        if (Game.levels.Nolevel >= 2) {
            Game.time = 40000;
        }
        var win = document.getElementById('win');
        win.setAttribute("style", "display:block");
        setTimeout(function() {
            win.setAttribute("style", "display:none");
            win.style.display = 'none';
            level();
//            Game.levels.noAliens = Game.levels.noAliens;
//            Game.levels.Nolevel = Game.levels.Nolevel;
//        Game.levels.timemovein3px = Game.levels.timemovein3px;
//            StartGameContainer(Game.username, Game.levels.Nolevel, Game.levels.noAliens, 30000, Game.charName, Game.levels.diedAfter, Game.score, Game.lives, Game.levels.timemovein3px);
          StartGameContainer(Game.username, Game.levels.Nolevel, Game.levels.noAliens,  Game.time, Game.charName, Game.levels.diedAfter, Game.score, Game.lives, Game.levels.timemovein3px);
        }, 3000);
    }// enf if

} //end of fun
