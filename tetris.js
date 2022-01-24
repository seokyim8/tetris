window.onload = startGame;


//Tetris variables
//one block is 25
let fall_time = 1000;
let stationary_tetriminos = [];

function startGame(){
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("board");
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext("2d");
    canvas.width = 250;
    canvas.height = 475;
    ctx.fillStyle = "red";

    let game_ended = false;

    let tb = new TetrisBoard();
    
    while(!game_ended){
        let tetrimino = new Tetrimino(BlockType.T,canvas,ctx);
        stationary_tetriminos.push(tetrimino);
        update(canvas, ctx);
        tetrimino.fall();
        let tetrimino_interval_id = setInterval(()=>{
            tetrimino.setInterval(tetrimino_interval_id);
            if(tetrimino.y == canvas.height - 25){
                update(canvas, ctx);
                tetrimino.stationary = true;
                tetrimino.clearInterval();
            }
            else{
                update(canvas, ctx);
                tetrimino.fall();
            }
        },fall_time);
        //add event listener for arrow keys
        window.addEventListener("keydown",(e)=>{
            switch(e.key){
                case "Left":
                case "ArrowLeft":
                    tetrimino.move("left");
                    break;
                case "Right":
                case "ArrowRight": 
                    tetrimino.move("right");
                    break;
                case "ArrowDown":
                    tetrimino.move("down");
                    break;
            }
        });
        break;
    }

    
}


class Tetrimino{
    constructor(type,canvas,ctx){
        this.x = 75;
        this.y = 0;
        this.blocktype = type;
        this.dx = 25;
        this.dy = 25;
        /**@type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.canvas = canvas;
        this.stationary = false;
        this.interval_id = null;
    }
    fall(){
        this.y += this.dy;
    }
    draw(){
        this.ctx.fillRect(this.x, this.y, 25, 25);
    }
    move(direction){//returns whether tetris block cannot move anymore or not
        if(this.stationary){
            return;
        }
        switch(direction){
            case "left":
                if(this.x != 0){
                    this.x -= this.dx;
                }
            break;
            case "right":
                if(this.x != 225){
                    this.x += this.dx;
                }
            break;
            case "down":
                if(this.y == this.canvas.height - 25){
                    this.clearInterval();
                    this.stationary = true;
                    return true;
                }
                else{
                    this.y += this.dy;
                    this.clearInterval();

                    this.interval_id = setInterval(()=>{
                        if(this.y == this.canvas.height - 25){
                            update(this.canvas, this.ctx);
                            this.stationary = true;
                            this.clearInterval();
                        }
                        else{
                            this.fall();
                            update(this.canvas, this.ctx);
                        }
                    },fall_time);
                }
            break;
        }
        update(this.canvas, this.ctx);
        return false;
    }
    setInterval(interval_id){
        this.interval_id = interval_id
    }
    clearInterval(){
        clearInterval(this.interval_id);
        this.interval_id = null;
    }
}

class TetrisBoard{
    constructor(){
        this.width = 250;
        this.height = 475;
        this.blocks = [];
        for(let i = 0; i < 10; i++){
            this.blocks.push([]);
            for(let j = 0; j < 19; j++){
                this.blocks[i].push(0);
            }
        }
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

function update(canvas, ctx){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < stationary_tetriminos.length; i++){
        stationary_tetriminos[i].draw();
    }
}

async function waitForFloorTouch(floor_touched){
    await new Promise((myResolve, myError)=>{
        while(!floor_touched){

        }
        myResolve("okay");
    });
}