window.onload = startGame;
/** @type {canvas} */
let canvas;
/** @type {CanvasRenderingContext2D} */
let ctx;

//Tetris variables
let fall_time = 1000;
let stationary_tetriminos = [];

function startGame(){
    canvas = document.getElementById("board");
    canvas.width = 250;
    canvas.height = 475;
    /** @type {CanvasRenderingContext2D} */
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";

    let game_ended = false;
    
    while(!game_ended){
        let floor_touched = false;
        let tetrimino = new Tetrimino(BlockType.T);
        stationary_tetriminos.push(tetrimino);
        let tetrimino_interval_id = setInterval(()=>{
            if(tetrimino.y == canvas.height - 25){
                floor_touched = true;
                clearInterval(tetrimino_interval_id);
            }
            else{
                tetrimino.fall();
                update();
            }
        },fall_time);
        //set event listener for arrow keys

        break;
    }




    let tetrimino = new Tetrimino(50, 0, 0, BlockType.L);
    tetrimino.draw();
    let tetris_fall = setInterval(() => {
        update(tetrimino);
    }, fall_time);

    
}


class Tetrimino{
    constructor(type){
        this.x = 50;
        this.y = -25;
        this.blocktype = type;
        this.dx = 25;
        this.dy = 25;
    }
    fall(){
        this.y += this.dy;
    }
    draw(){
        ctx.fillRect(this.x, this.y, 25, 25);
    }
}

//enum for tetrmino block types
class BlockType{
    constructor(name){
        this.name = name;
    }
    equals(block){
        if(block == null || block == undefined || !(block instanceof BlockType)){
            return false;
        }
        if(this.name == block.name){
            return true;
        }
        return false;
    }
    static L = new BlockType("L");
    static T = new BlockType("T");
    static I = new BlockType("I");
    static I = new BlockType("RL");
    static I = new BlockType("Z");
    static I = new BlockType("RZ");
    static I = new BlockType("O");
}

function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < stationary_tetriminos.length; i++){
        stationary_tetriminos[i].draw();
    }
}