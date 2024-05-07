let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (score === null) {
score = {
  wins: 0,
  losses: 0,
  ties: 0
};
}
*/

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {

//};    in this case we prefer using regular function
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {  //updated part
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    clearInterval(intervalId); //to stop autoplaying first when on
    isAutoPlaying = false;     //before we play manually
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    playGame('rock');
    
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    clearInterval(intervalId); 
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    clearInterval(intervalId); 
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    playGame('scissors');
  });

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    clearInterval(intervalId); 
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    showResetConfirmation();
  });

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  });

  //
document.body.addEventListener('keydown', (event) => {
  clearInterval(intervalId); 
  isAutoPlaying = false;
  document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if(event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showResetConfirmation();
  } else if (event.key === 'space') {
    clearInterval(intervalId); 
    isAutoPlaying = false;
    
  }
});


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result;

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
    result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {      
      result = 'Tie.';
    } else {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.'
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else {result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins = score.wins + 1;
  } else if (result === 'You lose.') {
    score.losses = score.losses + 1;
  } else if (result === 'Tie.') {
    score.ties = score.ties + 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  hideResetConfirmation();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You 
  <img src="images/${playerMove}-emoji.png" class="move-icon"> 
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;

  //let popupMessage = `You picked ${playerMove}. Computer picked ${computerMove}. ${result}
  //Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  //alert(popupMessage)
}

function updateScoreElement() {
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score')
  updateScoreElement();
  hideResetConfirmation();
  clearInterval(intervalId); 
  isAutoPlaying = false;
  document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
}

function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-reset-confirmation-yes reset-confirmation-button">Yes</button>
      <button class="js-reset-confirmation-no reset-confirmation-button">No</button>
      `;

  document.querySelector('.js-reset-confirmation-yes')
    .addEventListener('click', () => {
      resetScore();
    })

  document.querySelector('.js-reset-confirmation-no')
    .addEventListener('click', () => {
      hideResetConfirmation();
    })

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      resetScore();
    }
  })
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation').innerHTML = '';
}

function pickComputerMove() {
const randomNumber = Math.random();

let computerMove = '';             //or let computerMove;

if (randomNumber <= 1 / 3) {
  computerMove = 'rock';
} else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
  computerMove = 'paper';
} else {computerMove = 'scissors';
}

return computerMove;
}