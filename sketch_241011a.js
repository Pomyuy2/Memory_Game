// Tanawit Sittiwong, 6601012630033, Multiplayer, Hint, Timer
let buttons = [];
let numbers = [];
let flip = [];
let lastClickedIndex = -1; // To store the last clicked index
let secondLastClickedIndex = -1; // To store the second last clicked index
let rows, cols, w, h;

function setup() {
  createCanvas(700, 500);
  noLoop();
  
  createGameModeButtons();
  setGameMode('Easy');
}

function createGameModeButtons() {
  let buttonEasy = createButton('Easy');
  buttonEasy.position(50, 50);
  buttonEasy.mousePressed(() => setGameMode('Easy'));

  let buttonMedium = createButton('Medium');
  buttonMedium.position(150, 50);
  buttonMedium.mousePressed(() => setGameMode('Medium'));

  let buttonHard = createButton('Hard');
  buttonHard.position(250, 50);
  buttonHard.mousePressed(() => setGameMode('Hard'));
}

function setGameMode(mode) {
  buttons.forEach(button => button.remove());
  buttons = [];
  flip = [];

  switch (mode) {
    case 'Easy':
      rows = 2;
      cols = 5;
      break;
    case 'Medium':
      rows = 4;
      cols = 5;
      break;
    case 'Hard':
      rows = 8;
      cols = 5;
      break;
  }

  w = width / cols;
  h = height / rows;

  numbers = generateRandomNumbers(rows * cols / 2);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let index = i * cols + j;
      let button = createButton('');
      button.position(j * w + 500, i * h + 150);
      button.size(w, h);
      button.mousePressed(() => flipNumber(index, button));
      buttons.push(button);
      flip.push(false);
    }
  }
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
    button.html(verticalBars);
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
