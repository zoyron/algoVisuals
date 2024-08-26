let img;
let testImg;
let points = [];
const numPoints = 15000;

function preload() {
  img = loadImage("./krishna.jpg");
}

function setup() {
  testImg = createImage(img.width, img.height);
  createCanvas(img.width, img.height);
  background(0);
  img.loadPixels();
  testImg.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      testImg.set(i, j, color(img.get(i, j)));
    }
  }
  testImg.updatePixels();

  for (let i = 0; i < numPoints; i++) {
    points.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(0, 10);
  
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    
    let angle = noise(p.x * 0.005, p.y * 0.005, frameCount * 0.01) * TWO_PI * 2;
    let speed = noise(p.x * 0.005, p.y * 0.005, frameCount * 0.01 + 1000) * 2;
    
    let newX = p.x + cos(angle) * speed;
    let newY = p.y + sin(angle) * speed;
    
    let c = testImg.get(int(p.x), int(p.y));
    stroke(c);
    strokeWeight(0.5);
    line(p.x, p.y, newX, newY);
    
    points[i].set(newX, newY);
    
    if (newX < 0 || newX > width || newY < 0 || newY > height) {
      points[i].set(random(width), random(height));
    }
  }
}
