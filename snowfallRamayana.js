// snowflakes is an array of snowflake objects
let snowflakes = [];
let img;
let xoff = 0;
let scaleFactor = 7/10; // Scale factor for the canvas size

// preload() is a special function in P5.js that runs once before setup()
function preload() {
  // load the image (Ramayana.png) into the img variable
  img = loadImage('./ramayana.png');
}

// setup() is a special function in P5.js that runs once after preload()
function setup() {
  // create a canvas with the same size as the image, but scaled down by scaleFactor
  createCanvas(img.width * scaleFactor, img.height * scaleFactor);
  // disable drawing outlines around shapes
  noStroke();
  // set the background color to black
  background("#000000");
  // set the frame rate to 45 frames per second
  frameRate(45);
}

// draw() is a special function in P5.js that runs continuously after setup()
function draw() {
  // calculate the time since the last frame was drawn
  let t = frameCount / 90;
  
  // create a random number of snowflakes each frame
  for (let i = 0; i < random(50); i++) {
    // create a new snowflake object and add it to the snowflakes array
    snowflakes.push(new snowflake());
  }
  
  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    // update the position of the snowflake
    flake.update(t);
    // draw the snowflake
    flake.display();
  }
  
  // increment xoff by 1.0 each frame
  xoff += 1.0;
}

// snowflake is a constructor function that creates a new snowflake object
function snowflake() {
  // set the initial position of the snowflake
  this.posX = random(width);
  this.posY = random(-50, 0);
  // set the initial angle of the snowflake
  this.initialangle = random(0, 2 * PI);
  // set the size of the snowflake
  this.size = random(1, 3) * scaleFactor;
  // set the radius of the snowflake
  this.radius = sqrt(random(pow(width / 2, 2)));

  // update() is a method that updates the position of the snowflake
  this.update = function(time) {
    // angular speed
    let w = 1.6;
    // calculate the angle of the snowflake
    let angle = w * time + this.initialangle;
    // update the position of the snowflake
    this.posX = width / 2 + this.radius * sin(angle);
    this.posY += pow(this.size / scaleFactor, 0.5) * 2 * scaleFactor;

    // if the snowflake has gone off the bottom of the screen, remove it from the array
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  // display() is a method that draws the snowflake
  this.display = function() {
    // calculate the x and y coordinates of the snowflake on the original image
    let imgX = this.posX / scaleFactor;
    let imgY = this.posY / scaleFactor;
    // get the color of the pixel at the calculated coordinates
    fill(color(img.get(imgX, imgY)));
    // draw an ellipse at the position of the snowflake
    ellipse(this.posX, this.posY, this.size);
  };

}
