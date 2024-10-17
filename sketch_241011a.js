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
  createHintButton();
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
    let num = numbers[index];
    let verticalBars = '|'.repeat(num); 

    flip[index] = true; // Mark the button as flipped

    // Initialize the animation with an empty string
    button.html(''); 
    button.style('font-size', '32px');
    button.style('text-align', 'center');
    button.style('line-height', h + 'px');

    // Disable interactions during animation
    disableAllButtons();

    // Function to animate the appearance of bars
    let currentBars = '';
    for (let i = 0; i < verticalBars.length; i++) {
      setTimeout(() => {
        currentBars += '|';  // Add one bar at a time
        button.html(currentBars);  // Update the button content
      }, i * 300);  // Delay of 300ms between each bar
    }

    // After the animation is done, check for matches
    setTimeout(() => {
      if (lastClickedIndex !== -1) {
        if (numbers[lastClickedIndex] === numbers[index] && lastClickedIndex !== index) {
          button.style('background-color', 'green'); 
          buttons[lastClickedIndex].style('background-color', 'green'); 
          lastClickedIndex = -1; 
          secondLastClickedIndex = -1; 
        } else {
          if (secondLastClickedIndex !== -1) {
            buttons[lastClickedIndex].html(''); 
            buttons[secondLastClickedIndex].html(''); 
            flip[lastClickedIndex] = false; 
            flip[secondLastClickedIndex] = false; 
          }
          secondLastClickedIndex = lastClickedIndex; 
          lastClickedIndex = index; 
        }
      } else {
        lastClickedIndex = index; 
      }
      // Enable interactions again after the check
      enableAllButtons();
    }, verticalBars.length * 300); // Match checking after animation
  }
}

function disableAllButtons() {
  buttons.forEach(button => {
    button.attribute('disabled', true);
  });
}

function enableAllButtons() {
  buttons.forEach(button => {
    button.removeAttribute('disabled');
  });
}

function createHintButton() {
  let buttonHint = createButton('Hint');
  buttonHint.position(350, 50);
  buttonHint.mousePressed(showHint);
}

function draw() {
  
}
