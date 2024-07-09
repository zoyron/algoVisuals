
let values = [];
let i = 0;
let j = 0;
let sorted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width / 10)).fill().map(() => random(height));
  frameRate(30);
}

function draw() {
  background(30);

  if (!sorted) {
    if (i < values.length) {
      for (let k = 0; k < values.length - i - 1; k++) {
        let a = values[k];
        let b = values[k + 1];

        if (a > b) {
          values[k] = b;
          values[k + 1] = a;
        }
      }
      i++;
    } else {
      sorted = true;
    }
  }

  for (let i = 0; i < values.length; i++) {
    stroke(255);
    let col = map(values[i], 0, height, 0, 255);
    fill(col, 100, 255 - col, 150);
    rect(i * 10, height - values[i], 10, values[i], 5);
  }

  drawFrame();
}

function drawFrame() {
  strokeWeight(4);
  noFill();
  stroke(255);
  rect(0, 0, width, height);
}
