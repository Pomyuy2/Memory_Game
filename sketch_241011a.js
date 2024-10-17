// Tanawit Sittiwong, 6601012630033, Multiplayer, Hint, Timer
let buttons = [];
let numbers = [];
let flip = [];
let lastClickedIndex = -1; // To store the last clicked index
let secondLastClickedIndex = -1; // To store the second last clicked index
let rows, cols, w, h;
let startTime = 0; 
let gameStarted = false; 
let matchedPairsCount = 0;

let playerScores = [0, 0];  // Player 1 and Player 2 scores
let currentPlayer = 0;      // Track current player (0 = Player 1, 1 = Player 2)

function setup() {
  createCanvas(700, 500);
  noLoop();
  
  createGameModeButtons();
  createHintButton();
  setGameMode('Easy');
  createScoreDisplay();  // Display player scores
  createResetButton();
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
  gameStarted = false;
  matchedPairsCount = 0; 

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
    if (!gameStarted) {
      startTime = millis(); 
      gameStarted = true;  
    }
    
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
    
    // Show number on right bottom in button
    let numberDisplay = createDiv(numbers[index]);
    numberDisplay.position(button.x + button.width - 20, button.y + button.height - 25);
    numberDisplay.style('font-size', '18px');
    numberDisplay.style('color', 'white');

    // After the animation is done, check for matches
    setTimeout(() => {
      if (lastClickedIndex !== -1) {
        if (numbers[lastClickedIndex] === numbers[index] && lastClickedIndex !== index) {
          button.style('background-color', 'green'); 
          buttons[lastClickedIndex].style('background-color', 'green');
          matchedPairsCount++;
          playerScores[currentPlayer] += 1;  // Add a point to the player for a correct match
          
          if (matchedPairsCount === numbers.length / 2) {
            endGame();
          }
          
          // Switch player if the match is correct
          lastClickedIndex = -1; 
          secondLastClickedIndex = -1;
          currentPlayer = 1 - currentPlayer;  // Switch player
        } else {
          // If the guess is incorrect, no points are deducted, but the next player gets a turn
          if (secondLastClickedIndex !== -1) {
            buttons[lastClickedIndex].html(''); 
            buttons[secondLastClickedIndex].html(''); 
            flip[lastClickedIndex] = false; 
            flip[secondLastClickedIndex] = false; 
          }
          secondLastClickedIndex = lastClickedIndex; 
          lastClickedIndex = index;
          
          // Switch player after an incorrect guess
          currentPlayer = 1 - currentPlayer;
        }
      } else {
        lastClickedIndex = index; 
      }
      // Enable interactions again after the check
      enableAllButtons();
    }, verticalBars.length * 300); // Match checking after animation
  }
}

function endGame() {
  let endTime = millis();
  let timeTaken = (endTime - startTime) / 1000;
  
  // Check which player has the higher score
  let winner;
  if (playerScores[0] > playerScores[1]) {
    winner = 'Player 1';
  } else if (playerScores[1] > playerScores[0]) {
    winner = 'Player 2';
  } else {
    winner = 'Tie!';
  }
  
  alert(`${winner} wins. You completed the game in ${timeTaken.toFixed(2)} seconds.`);
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

function findMatchPairs() {
  let matchedPairs = [];
  
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] === numbers[j] && !flip[i] && !flip[j]) {
        matchedPairs.push([i, j]);
      }
    }
  }
  
  return matchedPairs;
}

function showHint() {
  let matchedPairs = findMatchPairs();
  
  matchedPairs.forEach(pair => {
    let [firstIndex, secondIndex] = pair;
    buttons[firstIndex].html(numbers[firstIndex]);
    buttons[secondIndex].html(numbers[secondIndex]);
    
    flip[firstIndex] = true;
    flip[secondIndex] = true;
    
    buttons[firstIndex].style('background-color', 'yellow'); 
    buttons[secondIndex].style('background-color', 'yellow'); 
  });

  setTimeout(() => {
    matchedPairs.forEach(pair => {
      let [firstIndex, secondIndex] = pair;
      buttons[firstIndex].html('');
      buttons[secondIndex].html('');

      flip[firstIndex] = false;
      flip[secondIndex] = false;
      
      buttons[firstIndex].style('background-color', ''); 
      buttons[secondIndex].style('background-color', ''); 
    });
  }, 1000);
}

function createScoreDisplay() {
  let player1ScoreLabel = createDiv('Player 1 Score:');
  player1ScoreLabel.position(500, 100);
  player1ScoreLabel.style('color', 'blue');

  let player2ScoreLabel = createDiv('Player 2 Score:');
  player2ScoreLabel.position(500, 130);
  player2ScoreLabel.style('color', 'red');

  let scoreDisplay1 = createDiv(playerScores[0]);
  scoreDisplay1.position(600, 100);
  scoreDisplay1.id('score1');

  let scoreDisplay2 = createDiv(playerScores[1]);
  scoreDisplay2.position(600, 130);
  scoreDisplay2.id('score2');

  // Update the score every 100ms
  function updateScoreDisplay() {
    select('#score1').html(playerScores[0]);
    select('#score2').html(playerScores[1]);
  }

  setInterval(updateScoreDisplay, 100);
}

function createResetButton() {
  let buttonReset = createButton('Reset');
  buttonReset.position(450, 50);
  buttonReset.mousePressed(resetGame);
}

function resetGame() {
  // Reset scores
  playerScores = [0, 0];
  currentPlayer = 0;
  
  // Reset game state
  setGameMode('Easy'); 
  startTime = 0;
  matchedPairsCount = 0;
  gameStarted = false;
  
  // update score
  select('#score1').html(playerScores[0]);
  select('#score2').html(playerScores[1]);
  
  // enable button to play again
  enableAllButtons();
}

function draw() {
  
}
