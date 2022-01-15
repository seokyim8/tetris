window.onload = startGame;
/** @type {canvas} */
let canvas;
/** @type {CanvasRenderingContext2D} */
let ctx;

//Tetris variables
let fall_time = 1000;

function startGame(){
    canvas = document.getElementById("board");
    canvas.width = 250;
    canvas.height = 475;
    /** @type {CanvasRenderingContext2D} */
    ctx = canvas.getContext("2d");

    let game_ended = false;
    
    while(!game_ended){
        let floor_touched = false;
        let tetrimino = new Tetrimino(BlockType.T);
        let tetrimino_interval_id = setInterval(()=>{
            if(tetrimino.x == canvas.height - 25){
                clearInterval(tetrimino_interval_id);
                continue;
            }
            else{
                
            }
        },1000);
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
        this.y = 0;
        this.blocktype = type;
        this.dx = 25;
        this.dy = 25;
    }
    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(100, this.y, 25, 25);
        this.y += this.dy;
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

function update(tetrimino){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tetrimino.draw();
}