window.onload = setup;
/** @type {canvas} */
let canvas;
/** @type {CanvasRenderingContext2D} */
let ctx;

function setup(){
    canvas = document.getElementById("board");
    canvas.width = window.innerWidth/2;
    canvas.height = window.innerHeight/2;
    /** @type {CanvasRenderingContext2D} */
    ctx = canvas.getContext("2d");
    
    let tetrimino = new Tetrimino(50, 0, 0, BlockType.L);
    tetrimino.draw();
    Update(tetrimino);
}


class Tetrimino{
    constructor(x, y, rotation, type){
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.blocktype = type;
        this.dx = 10;
        this.dy = 10;
    }
    draw(){
        ctx.fillStyle = "purple";
        ctx.fillRect(this.x,this.y,10,10);
    }
    animate(){
        if(this.y + 10 > canvas.height){
            this.dy *= -1;
        }
        else if(this.y -10 < 0 && this.dy < 0 ){
            this.dy *= -1;
        }
        this.y += this.dy;
        this.draw();
    }
}

function Update(tetrimino){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    tetrimino.animate();

    requestAnimationFrame(()=>{
        Update(tetrimino);
    });
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