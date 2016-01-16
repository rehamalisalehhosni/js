
var gameOver = document.getElementById('gameOver');
var playAgain = document.getElementById('playAgain');
var timer = document.getElementById('timer');

playAgain.onclick = function() {
    location.href = "index.html";
};

function starttime() {
    timer.innerHTML = Game.time;
    timefu2 = setInterval(
            function() {
                if (Game.time > 0) {
                    Game.time = Game.time - 100;
                    timer.innerHTML = Game.time;
                } else {
                    clearInterval(timefu2);
                    // console.log( Game.lev;
                    tryAgain();
                }
            }
    , 100);
    // call doMove in 20msec //end set interval 
} // end starttime function 


function tryAgain() {
    var aliens = document.getElementById('aliens');
    var div_d = aliens.getElementsByTagName('div');
    var youlose = document.getElementById('youlose');
    Game.lives = Game.lives - 1;
    var life = document.getElementById('life');
    life.innerHTML = Game.lives;
    if (Game.lives == 0) {
         rest();
        clearInterval(timefu2);
         clearInterval(newint);
        container.style.display="none";
        gameOver.style.display = "block";
        playAgain.style.display = "block";
    } else {
        youlose.setAttribute("style", "display:block");
            clearInterval(timefu2);
             clearInterval(newint);
        setTimeout(function() {
            youlose.setAttribute("style", "display:none");
            youlose.style.display = 'none';
            Game.levels.noAliens = Game.levels.noAliens;
            Game.levels.Nolevel = Game.levels.Nolevel;
//          Game.levels.timemovein3px = Game.levels.timemovein3px;
            StartGameContainer(Game.username, Game.levels.Nolevel, Game.levels.noAliens, 30000, Game.charName, Game.levels.diedAfter, Game.score, Game.lives, Game.levels.timemovein3px);
        }, 5000);
    }
}
