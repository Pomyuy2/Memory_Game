// Tanawit Sittiwong, 6601012630033
let buttons = [];
let numbers = [];
let flip = [];
let lastClickedIndex = -1; // To store the last clicked index
let secondLastClickedIndex = -1; // To store the second last clicked index

function setup() {
  createCanvas(400, 200);
  noLoop();
  let rows0 = 2;
  let cols0 = 5;
  let w0 = width / cols0;
  let h0 = height / rows0;

  numbers = generateRandomNumbers(5);

  for (let i = 0; i < rows0; i++) {
    for (let j = 0; j < cols0; j++) {
      let index = i * cols0 + j; 
      let button = createButton(''); 
      button.position(j * w0 + 50, i * h0 + 100);
      button.size(w0, h0);
      button.mousePressed(() => flipNumber(index, button));
      buttons.push(button); 
      flip.push(false); 
    }
  }
  
  createCanvas(500, 400);
  noLoop();
  let rows = 4;
  let cols = 5;
  let w = width / cols;
  let h = height / rows;

  numbers = generateRandomNumbers(10);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let index = i * cols + j; 
      let button = createButton(''); 
      button.position(j * w + 530, i * h + 100);
      button.size(w, h);
      button.mousePressed(() => flipNumber(index, button));
      buttons.push(button); 
      flip.push(false); 
    }
  }
  
  createCanvas(500, 600);
  noLoop();
  let rows2 = 8;
  let cols2 = 5;
  let w2 = width / cols2;
  let h2 = height / rows2;

  numbers = generateRandomNumbers(20);

  for (let i = 0; i < rows2; i++) {
    for (let j = 0; j < cols2; j++) {
      let index = i * cols2 + j; 
      let button = createButton(''); 
      button.position(j * w2 + 1100, i * h2 + 100);
      button.size(w2, h2);
      button.mousePressed(() => flipNumber(index, button));
      buttons.push(button); 
      flip.push(false); 
    }
  }
  
  let button2 = createButton('Easy');
  button2.position(225, 50);
  let button3 = createButton('Medium');
  button3.position(750, 50);
  let button4 = createButton('Hard');
  button4.position(1325, 50);
}

function generateRandomNumbers(pairCount) {
  let nums = [];
  while (nums.length < pairCount * 2) {
    let num = floor(random(1, pairCount + 1));
    if (nums.filter(n => n === num).length < 2) {
      nums.push(num);
    }
  }
  return nums;
}

function flipNumber(index, button) {
  if (!flip[index]) { 
    button.html(numbers[index]); 
    flip[index] = true; 
    
    // Check for a match
    if (lastClickedIndex !== -1) {
      if (numbers[lastClickedIndex] === numbers[index] && lastClickedIndex !== index) {
        button.style('background-color', 'green'); // Change color to green
        buttons[lastClickedIndex].style('background-color', 'green'); // Change the previous button color to green
        lastClickedIndex = -1; // Reset last clicked index
        secondLastClickedIndex = -1; // Reset second last clicked index
      } else {
        // If a third button is clicked and the previous two don't match
        if (secondLastClickedIndex !== -1) {
          // Flip back the last two buttons
          buttons[lastClickedIndex].html(''); // Flip back the previous button
          buttons[secondLastClickedIndex].html(''); // Flip back the second last button
          flip[lastClickedIndex] = false; // Update flip state
          flip[secondLastClickedIndex] = false; // Update flip state
        }
        // Update the clicked indexes
        secondLastClickedIndex = lastClickedIndex; // Move the last clicked to second last
        lastClickedIndex = index; // Update last clicked index
      }
    } else {
      lastClickedIndex = index; // Set the first clicked button
    }
  }
}

function draw() {
  
}
