class Rain{
    constructor(){
        this.x = random(-width,width);
        this.y = random(-height,height);
        this.z = random(width);
    }
    
    show(){
        fill(200, 200, 200);
        noStroke();
        this.sx = map(this.x/this.z,0,1,0,width);
        this.sy = map(this.y/this.z,0,1,0,height);
        this.r = map(this.z,0,width,8,0);
        circle(this.sx,this.sy,this.r);
    }
    update(){
        this.z = this.z-6;
        if(this.z<1){
            this.x = random(-width,width);
            this.y = random(-height,height);
            this.z = width;
        }
    }
}

let drops = [];

function setup(){
    createCanvas(windowWidth,windowHeight);
    for(let i = 0;i<2500;i++){
        let tempo = new Rain();
        drops.push(tempo);
    }
}

function draw(){
    translate(width/2,height/2);
    background(0);
    for(let i = 0;i<drops.length;i++){
        drops[i].update();
        drops[i].show();
    }
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}
