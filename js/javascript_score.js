///Dahlia
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function incrementScore(){

Game.score +=  parseInt(Game.levels.diedAfter)*100;

var scorehtml=document.getElementById('score');
scorehtml.innerHTML=Game.score;
}

function level() {

var level2=document.getElementById('level');
level2.innerHTML=Game.levels.Nolevel;
console.log(Game.levels.Nolevel);

}
function life() {

var life=document.getElementById('life');
life.innerHTML=Game.lives;
}