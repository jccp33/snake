"use strict";

const TOT_CELLS = 15 * 15;
const GRID_ROWS = 15;
const GRID_COLS = 15;
const GRID_CELL = "cell";
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;
const NOT_STARTED = 0;
const STARTED = 1;
const PAUSE = 2;
const GAMEOVER = 3;

function GetRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function GetID(row, col){
    let id = {};
    let num = row * GRID_ROWS + col;
    id.row = row;
    id.col = col;
    id.num = num;
    id._id = GRID_CELL + num;
    return id;
}

function ClearGrid(){
    for(let i=0; i<TOT_CELLS; i++){
        let cell = document.getElementById(GRID_CELL + i);
        cell.style.backgroundColor = "#CCC";
    }
}

function SetUp(){
    if(document.readyState == "complete"){
        let grid = document.getElementById('grid');
        for(let i=0; i<TOT_CELLS; i++){
            let cell = document.createElement('div');
            cell.classList.add("grid-cell");
            cell.id = GRID_CELL + i;
            //cell.innerHTML = i;
            grid.appendChild(cell);
        }

        let btns = document.getElementById('div-btns');
        for(let i=0; i<btns.children.length; i++){
            btns.children[i].disabled = false;
        }

        //let is_mobile = /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        //if(!is_mobile){
        //    document.getElementById('floating_btns').style.display = "none";
        //}
        //console.log(is_mobile);
    }
}

document.onreadystatechange = SetUp;
