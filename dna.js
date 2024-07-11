function setup(){
  createCanvas(windowWidth,windowHeight);
}
let t = 0;
function draw(){
  background('#0a6078');
  translate(width/2,-5*height);
  for(let i = 0;i<500;i++){
    strokeWeight(2);
    fill('#dadada');
    stroke('#dadada');
    line(xa1(t+i),ya1(t+i),xa2(t+i)+20,ya2(t+i)+20);
    circle(xa1(t+i),ya1(t+i),5);
    circle(xa2(t+i)+20,ya2(t+i)+20,5);
    strokeWeight(2);
    fill('#dadada');
    stroke('#dadada');
    line(x1(t+i),y1(t+i),x2(t+i)+20,y2(t+i)+20);
    circle(x1(t+i),y1(t+i),3);
    circle(x2(t+i)+20,y2(t+i)+20,3);
  }
  t+=0.075;
}

function x1(t){
  return sin(t/10)*100;
}

function y1(t){
  return (t/10)*100;
}

function x2(t){
  return -sin(t/10)*100;
}

function y2(t){
  return (t/10)*100;
}

function xa1(t){
  return -cos(t/10)*100;
}

function ya1(t){
  return (t/10)*100;
}

function xa2(t){
  return cos(t/10)*100;
}

function ya2(t){
  return (t/10)*100;
}

function xb1(t){
  return -((cos(t/10)+sin(t/10)))*100;
}

function yb1(t){
  return (t/10)*100;
}

function xb2(t){
  return ((cos(t/10)+sin(t/10)))*100;
}

function yb2(t){
  return (t/10)*100;
}
