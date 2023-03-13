"use strict"

class FOOD{
    constructor(row, col){
        this.id = GetID(row, col);
        this.color = "darkgreen";
    }

    draw(){
        let cell = document.getElementById(this.id._id);
        cell.style.backgroundColor = this.color;
    }
};

class SNAKE{
    constructor(row, col){
        this.head_color = "#990000";
        this.color = "#FF0000";
        this.body = [];
        this.body.push(GetID(row, col));

        switch(GetRandomInt(0, 4)){
            case 0: this.orientation = UP;
            break;
            case 1: this.orientation = DOWN;
            break;
            case 2: this.orientation = LEFT;
            break;
            case 3: this.orientation = RIGHT;
            break;
            default:
            break;
        }
    }

    checkWall(){
        let row = this.body[0].row;
        let col = this.body[0].col;
        if(this.orientation===UP && row<0){
            return true;
        }else if(this.orientation===DOWN && row>14){
            return true;
        }else if(this.orientation===LEFT && col<0){
            return true;
        }else if(this.orientation===RIGHT && col>14){
            return true;
        }
        return false;
    }

    checkBody(){
        for(let i=0; i<this.body.length; i++){
            let num = this.body[i].num;
            for(let j=0; j<this.body.length; j++){
                if(j!==i && this.body[j].num===num){
                    return true;
                }
            }
        }
        return false;
    }

    eat(){
        if(this.body[0]._id === FOOD_GAME.id._id){
            SCORE_GAME++;
            document.getElementById("div_score").innerHTML = "SCORE: " + SCORE_GAME;
            this.grow();
            FOOD_GAME = new FOOD(GetRandomInt(1, GRID_COLS-1), GetRandomInt(1, GRID_ROWS-1));
        }
    }

    grow(){
        let row = this.body[0].row;
        let col = this.body[0].col;
        if(this.orientation === UP){
            row--;
        }else if(this.orientation === DOWN){
            row++;
        }else if(this.orientation === LEFT){
            col--;
        }else if(this.orientation === RIGHT){
            col++;
        }
        let next_id = GetID(row, col);
        this.body.unshift(next_id);
    }

    move(direction){
        if(this.orientation===UP && direction===UP){
            this.updateBody(true, -1);
        }else if(this.orientation===DOWN && direction===DOWN){
            this.updateBody(true, 1);
        }else if(this.orientation===LEFT && direction===LEFT){
            this.updateBody(false, -1);
        }else if(this.orientation===RIGHT && direction===RIGHT){
            this.updateBody(false, 1);
        }
        
        if(this.orientation===UP && direction===LEFT){
            this.updateBody(false, -1);
            this.orientation = LEFT;
        }else if(this.orientation===UP && direction===RIGHT){
            this.updateBody(false, 1);
            this.orientation = RIGHT;
        }else if(this.orientation===DOWN && direction===LEFT){
            this.updateBody(false, -1);
            this.orientation = LEFT;
        }else if(this.orientation===DOWN && direction===RIGHT){
            this.updateBody(false, 1);
            this.orientation = RIGHT;
        }

        if(this.orientation===LEFT && direction===UP){
            this.updateBody(true, -1);
            this.orientation = UP;
        }else if(this.orientation===LEFT && direction===DOWN){
            this.updateBody(true, 1);
            this.orientation = DOWN;
        }else if(this.orientation===RIGHT && direction===UP){
            this.updateBody(true, -1);
            this.orientation = UP;
        }else if(this.orientation===RIGHT && direction===DOWN){
            this.updateBody(true, 1);
            this.orientation = DOWN;
        }

        this.eat();
    }

    updateBody(row, unit){
        let body = [];

        if(row){
            let head = GetID(this.body[0].row+unit, this.body[0].col);
            body.push(head);
            for(let i=0; i<this.body.length-1; i++){
                body.push(this.body[i]);
            }
        }else{
            let head = GetID(this.body[0].row, this.body[0].col+unit);
            body.push(head);
            for(let i=0; i<this.body.length-1; i++){
                body.push(this.body[i]);
            }
        }
        
        this.body = body;
    }

    draw(){
        if(this.body.length > 0){
            let head = document.getElementById(this.body[0]._id);
            if(head !== null) head.style.backgroundColor = this.head_color;
            for(let i=1; i<this.body.length; i++){
                let cell = document.getElementById(this.body[i]._id);
                if(cell !== null) cell.style.backgroundColor = this.color;
            }
        }
    }
}

function StartGame(){
    STATUS_GAME = STARTED;
    FOOD_GAME.draw();
    SNAKE_GAME.draw();
    let btns = document.getElementById('div-btns');
    btns.children[0].disabled = true;
    btns.children[0].blur();
}

function PauseGame(){
    if(STATUS_GAME === PAUSE){
        STATUS_GAME = STARTED;
    }else{
        if(STATUS_GAME === STARTED){
            STATUS_GAME = PAUSE;
            let btns = document.getElementById('div-btns');
            btns.children[0].disabled = true;
        }
    }
}

let SCORE_GAME = 0;
let TIME_GAME = 0;
let STATUS_GAME = NOT_STARTED;
let FOOD_GAME = new FOOD(GetRandomInt(1, GRID_COLS), GetRandomInt(0, GRID_ROWS-1));
let SNAKE_GAME = new SNAKE(parseInt(GRID_ROWS/2), parseInt(GRID_COLS/2));

setInterval(function(){
    if(STATUS_GAME === STARTED){
        TIME_GAME++;
        document.getElementById('div_time').innerHTML = "TIEMPO: " + TIME_GAME + " seg";
        
        SNAKE_GAME.move(SNAKE_GAME.orientation);
        ClearGrid();
        FOOD_GAME.draw();
        SNAKE_GAME.draw();

        if(SNAKE_GAME.checkWall() || SNAKE_GAME.checkBody()){
            STATUS_GAME = GAMEOVER;
        }
    }

    if(STATUS_GAME === GAMEOVER){
        document.getElementById("modal_score").innerHTML = "SCORE: " + SCORE_GAME;
        document.getElementById("modal_time").innerHTML = "TIEMPO: " + TIME_GAME + " seg";
        document.getElementById("w-modal").style.display = "block";
    }
}, 1000);

function MoveUp(){
    if(STATUS_GAME === STARTED){
        SNAKE_GAME.move(UP);
        ClearGrid();
        FOOD_GAME.draw();
        SNAKE_GAME.draw();

        if(SNAKE_GAME.checkWall() || SNAKE_GAME.checkBody()){
            STATUS_GAME = GAMEOVER;
        }
    }
}

function MoveDown(){
    if(STATUS_GAME === STARTED){
        SNAKE_GAME.move(DOWN);
        ClearGrid();
        FOOD_GAME.draw();
        SNAKE_GAME.draw();

        if(SNAKE_GAME.checkWall() || SNAKE_GAME.checkBody()){
            STATUS_GAME = GAMEOVER;
        }
    }
}

function MoveLeft(){
    if(STATUS_GAME === STARTED){
        SNAKE_GAME.move(LEFT);
        ClearGrid();
        FOOD_GAME.draw();
        SNAKE_GAME.draw();

        if(SNAKE_GAME.checkWall() || SNAKE_GAME.checkBody()){
            STATUS_GAME = GAMEOVER;
        }
    }
}

function MoveRight(){
    if(STATUS_GAME === STARTED){
        SNAKE_GAME.move(RIGHT);
        ClearGrid();
        FOOD_GAME.draw();
        SNAKE_GAME.draw();

        if(SNAKE_GAME.checkWall() || SNAKE_GAME.checkBody()){
            STATUS_GAME = GAMEOVER;
        }
    }
}

document.onkeydown = function(e){
    let ev = e || window.event;

    if(STATUS_GAME === STARTED){
        ev.preventDefault();
        if(ev.keyCode === 38){
            SNAKE_GAME.move(UP);
            ClearGrid();
            FOOD_GAME.draw();
            SNAKE_GAME.draw();

            if(SNAKE_GAME.checkWall() || SNAKE_GAME.checkBody()){
                STATUS_GAME = GAMEOVER;
            }
        }else if(ev.keyCode === 40){
            SNAKE_GAME.move(DOWN);
            ClearGrid();
            FOOD_GAME.draw();
            SNAKE_GAME.draw();

            if(SNAKE_GAME.checkWall() || SNAKE_GAME.checkBody()){
                STATUS_GAME = GAMEOVER;
            }
        }else if(ev.keyCode === 37){
            SNAKE_GAME.move(LEFT);
            ClearGrid();
            FOOD_GAME.draw();
            SNAKE_GAME.draw();

            if(SNAKE_GAME.checkWall() || SNAKE_GAME.checkBody()){
                STATUS_GAME = GAMEOVER;
            }
        }else if(ev.keyCode === 39){
            SNAKE_GAME.move(RIGHT);
            ClearGrid();
            FOOD_GAME.draw();
            SNAKE_GAME.draw();

            if(SNAKE_GAME.checkWall() || SNAKE_GAME.checkBody()){
                STATUS_GAME = GAMEOVER;
            }
        }
    }
}