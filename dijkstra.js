let grid;
let cols = 30;
let rows = 30;
let cellSize;
let start, end;
let openSet = [];
let closedSet = [];
let path = [];
let current;
let finished = false;
let animationProgress = 0;

// Apple-inspired color scheme
let bgColor, cellColor, wallColor, openSetColor, closedSetColor, pathColor, startColor, endColor, gridColor;

function setup() {
  createCanvas(600, 600);
  cellSize = min(width * 0.9 / cols, height * 0.9 / rows);
  
  // Initialize Apple-inspired color scheme
  bgColor = color(245, 245, 247);
  cellColor = color(255, 255, 255);
  wallColor = color(220, 220, 225);
  openSetColor = color(0, 122, 255, 150);
  closedSetColor = color(88, 86, 214, 100);
  pathColor = color(255, 149, 0);
  startColor = color(52, 199, 89);
  endColor = color(255, 59, 48);
  gridColor = color(230, 230, 230);

  initializeGrid();
}

function initializeGrid() {
  grid = Array.from({ length: cols }, (_, i) => 
    Array.from({ length: rows }, (_, j) => new Cell(i, j))
  );
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
  
  start = grid[0][0];
  end = grid[cols-1][rows-1];
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (random(1) < 0.3) {
        grid[i][j].wall = true;
      }
    }
  }
  start.wall = false;
  end.wall = false;
  
  start.distance = 0;
  openSet.push(start);
}

function draw() {
  background(bgColor);
  drawGrid();
  updateAlgorithm();
  drawPath();
}

function drawGrid() {
  let offsetX = (width - cols * cellSize) / 2;
  let offsetY = (height - rows * cellSize) / 2;
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(offsetX, offsetY);
    }
  }
}

function updateAlgorithm() {
  if (!finished && frameCount % 3 === 0) {
    if (openSet.length > 0) {
      current = openSet.reduce((a, b) => a.distance < b.distance ? a : b);
      
      if (current === end) {
        console.log("Path found!");
        finished = true;
        return;
      }
      
      openSet = openSet.filter(cell => cell !== current);
      closedSet.push(current);
      
      for (let neighbor of current.neighbors) {
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          let tentativeDistance = current.distance + 1;
          
          if (tentativeDistance < neighbor.distance) {
            neighbor.distance = tentativeDistance;
            neighbor.previous = current;
            if (!openSet.includes(neighbor)) {
              openSet.push(neighbor);
            }
          }
        }
      }
    } else {
      console.log("No path found");
      finished = true;
      return;
    }
    
    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }
  }
  
  animationProgress = lerp(animationProgress, 1, 0.1);
}

function drawPath() {
  if (path.length > 0) {
    let offsetX = (width - cols * cellSize) / 2;
    let offsetY = (height - rows * cellSize) / 2;
    
    noFill();
    stroke(pathColor);
    strokeWeight(cellSize / 3);
    beginShape();
    for (let i = 0; i < path.length * animationProgress; i++) {
      let cell = path[i];
      let x = offsetX + cell.i * cellSize + cellSize / 2;
      let y = offsetY + cell.j * cellSize + cellSize / 2;
      curveVertex(x, y);
    }
    endShape();
  }
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;
    this.distance = Infinity;
    this.animationProgress = 0;
  }
  
  addNeighbors(grid) {
    let i = this.i;
    let j = this.j;
    if (i < cols - 1) this.neighbors.push(grid[i+1][j]);
    if (i > 0) this.neighbors.push(grid[i-1][j]);
    if (j < rows - 1) this.neighbors.push(grid[i][j+1]);
    if (j > 0) this.neighbors.push(grid[i][j-1]);
  }
  
  show(offsetX, offsetY) {
    let x = offsetX + this.i * cellSize;
    let y = offsetY + this.j * cellSize;
    
    if (this.wall) {
      fill(wallColor);
    } else if (this === start) {
      fill(startColor);
    } else if (this === end) {
      fill(endColor);
    } else if (closedSet.includes(this)) {
      fill(lerpColor(cellColor, closedSetColor, this.animationProgress));
    } else if (openSet.includes(this)) {
      fill(lerpColor(cellColor, openSetColor, this.animationProgress));
    } else {
      fill(cellColor);
    }
    
    noStroke();
    rect(x, y, cellSize, cellSize, cellSize / 4);
    
    if (closedSet.includes(this) || openSet.includes(this)) {
      this.animationProgress = lerp(this.animationProgress, 1, 0.1);
    }
  }
}

function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j);
}
