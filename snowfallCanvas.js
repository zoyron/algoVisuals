let snowflakes = []; // array to hold snowflake objects
let img;
let xoff = 0;
function preload() {
  img = loadImage('./krish.jpeg');
}

function setup() {
  createCanvas(img.width, img.height);
  // fill("#e3e3e3");
  noStroke();
  background("#000000");
}

function draw() {
  // fill(random(255),random(255),random(255));
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
   for (let i = 0; i < random(30); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    
    flake.display(); // draw snowflake
  }
  xoff+=0.25;
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = random(width);
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(1, 3);
  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // y position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);
    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);
    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    fill(color(img.get(this.posX, this.posY)));
    ellipse(this.posX, this.posY, this.size);
  };
}
