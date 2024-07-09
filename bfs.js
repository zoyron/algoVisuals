let grid;
let cols = 20;
let rows = 20;
let cellSize;
let start, end;
let openSet = [];
let closedSet = [];
let path = [];
let current;
let finished = false;
let stepCounter = 0;
let speed = 5; // Number of frames to wait before each step
let lerpAmount = 5; // Amount for interpolation

// New soothing color scheme
let bgColor;
let wallColor;
let cellColor;
let openSetColor;
let closedSetColor;
let pathColor;
let connectionColor;
let startColor;
let endColor;

function setup() {
  createCanvas(600, 600);
  cellSize = width / cols;
  
  // Initialize new color scheme
  bgColor = color(230, 230, 250); // Lavender mist
  wallColor = color(62.5); // Light steel blue
  cellColor = color(255, 255, 255, 150); // Semi-transparent white
  openSetColor = color(152, 251, 152, 200); // Pale green
  closedSetColor = color(255, 182, 193, 150); // Light pink
  pathColor = color(70, 130, 180); // Steel blue
  connectionColor = color(221, 160, 221, 150); // Plum
  startColor = color(50, 205, 50); // Lime green
  endColor = color(255, 99, 71); // Tomato

  // Create and initialize grid
  grid = Array.from({ length: cols }, (_, i) => 
    Array.from({ length: rows }, (_, j) => new Cell(i, j))
  );
  
  // Set neighbors
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
  
  // Set start and end
  start = grid[0][0];
  end = grid[cols-1][rows-1];
  
  // Add walls randomly
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (random(1) < 0.3) {
        grid[i][j].wall = true;
      }
    }
  }
  start.wall = false;
  end.wall = false;
  
  openSet.push(start);
}

function draw() {
  background(bgColor);

  if (!finished) {
    if (stepCounter % speed === 0) {
      // BFS algorithm step
      if (openSet.length > 0) {
        current = openSet.shift();
        
        if (current === end) {
          console.log("DONE!");
          finished = true;
        }
        
        closedSet.push(current);
        
        let neighbors = current.neighbors;
        for (let i = 0; i < neighbors.length; i++) {
          let neighbor = neighbors[i];
          
          if (!closedSet.includes(neighbor) && !neighbor.wall) {
            if (!openSet.includes(neighbor)) {
              openSet.push(neighbor);
              neighbor.previous = current;
            }
          }
        }
      } else {
        console.log("No solution");
        noLoop();
        return;
      }
      
      // Find path
      path = [];
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      lerpAmount = 0; // Reset interpolation amount
    }
    stepCounter++;
  }

  // Interpolation update
  lerpAmount += 0.1; // Adjust speed of interpolation
  if (lerpAmount > 1) lerpAmount = 1;
  
  // Draw grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  
  // Draw path
  noFill();
  stroke(pathColor);
  strokeWeight(3);
  beginShape();
  for (let i = 0; i < path.length - 1; i++) {
    let x1 = path[i].i * cellSize + cellSize / 2;
    let y1 = path[i].j * cellSize + cellSize / 2;
    let x2 = path[i + 1].i * cellSize + cellSize / 2;
    let y2 = path[i + 1].j * cellSize + cellSize / 2;
    let lx = lerp(x1, x2, lerpAmount);
    let ly = lerp(y1, y2, lerpAmount);
    vertex(lx, ly);
  }
  endShape();
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;
  }
  
  addNeighbors(grid) {
    let i = this.i;
    let j = this.j;
    if (i < cols - 1) this.neighbors.push(grid[i+1][j]);
    if (i > 0) this.neighbors.push(grid[i-1][j]);
    if (j < rows - 1) this.neighbors.push(grid[i][j+1]);
    if (j > 0) this.neighbors.push(grid[i][j-1]);
  }
  
  show() {
    stroke(100);
    strokeWeight(1);
    if (this.wall) {
      fill(wallColor);
    } else if (this === start) {
      fill(startColor);
    } else if (this === end) {
      fill(endColor);
    } else if (closedSet.includes(this)) {
      fill(closedSetColor);
    } else if (openSet.includes(this)) {
      fill(openSetColor);
    } else {
      fill(cellColor);
    }
    ellipse(this.i * cellSize + cellSize / 2, this.j * cellSize + cellSize / 2, cellSize * 0.7, cellSize * 0.7);
    
    // Connect to previous cell
    if (this.previous) {
      stroke(connectionColor);
      line(this.i * cellSize + cellSize / 2, this.j * cellSize + cellSize / 2,
           this.previous.i * cellSize + cellSize / 2, this.previous.j * cellSize + cellSize / 2);
    }
  }
}
