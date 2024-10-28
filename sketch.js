function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 5;
let cnv;
let counter = 0;
//let flag;

let slider2;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cols = floor(width / resolution);
  rows = floor(height / resolution);

  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }

  slider2 = createSlider(0, 255, 0);
  slider2.position(0, 10);
  slider2.size(80);

  //setInterval(reproduction, 2000);

  cnv.mouseWheel(changeVal);
}

function draw() {
  background(0);

  //let myVal = slider2.value();
  let myVal = counter;
  console.log(myVal);

  if (myVal >= 0 && myVal < 100) {
    reproductionRate = floor(map(myVal, 0, 99, 1000, 100));
  } else if (myVal >= 100 && myVal < 200) {
    reproductionRate = floor(map(myVal, 100, 199, 99, 10));
  } else if (myVal >= 200) {
    reproductionRate = floor(map(myVal, 200, 255, 10, 0));
  }

  //console.log("myVal: " + myVal, "RR: " + reproductionRate);
  reproduction();

  //   window.addEventListener("keyup", (event) => {
  //     flag = false;
  //   });

  //   if (!flag) {
  //     if (keyIsDown(80)) {
  //       for (let i = 0; i < 1000; i++) {
  //         let randomCols = floor(random(cols));
  //         let randomRows = floor(random(rows));
  //         grid[randomCols][randomRows] = floor(random(2));
  //         // console.log("aggiunta " + randomCols, randomRows);
  //         flag = true;
  //       }
  //     }
  //   }

  //keyPressed();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  let next = make2DArray(cols, rows);

  //compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];

      // count live neighbors
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function reproduction() {
  for (let i = 0; i < reproductionRate; i++) {
    let randomCols = floor(random(cols));
    let randomRows = floor(random(rows));
    grid[randomCols][randomRows] = floor(random(2));
    // console.log("aggiunta " + randomCols, randomRows);
    //flag = true;
  }
}

function changeVal(event) {
  if (event.deltaY > 0) {
    counter += 20;
    console.log(counter);
  } else if (event.deltaY < 0) {
    counter -= 20;
    console.log(counter);
  }
}
