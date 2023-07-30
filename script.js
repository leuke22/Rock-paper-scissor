let playerScore = JSON.parse(localStorage.getItem('playerScore')) || {
    wins: 0,
    loses: 0,
    tie: 0
};

let computerScore = JSON.parse(localStorage.getItem('computerScore')) || {
    wins: 0,
    loses: 0,
    tie: 0
};

let playerResult = '';
let computerResult = '';

let isAutoplay = false;
let autoplaying;


document.querySelector('.rock-button').addEventListener('click', () => {
    playGame('rock');
    updateScoreElement();
});

document.querySelector('.paper-button').addEventListener('click', () => {
    playGame('paper');
    updateScoreElement();
});

document.querySelector('.scissors-button').addEventListener('click', () => {
    playGame('scissors');
    updateScoreElement();
});


document.querySelector('.reset-score').addEventListener('click', resetScores);

document.querySelector('.auto-play').addEventListener('click', autoPlay);

document.addEventListener('keydown', (event) => {
    if(event.key === 'r'){
        playGame('rock');
    } else if (event.key === 'p'){
        playGame('paper');
    } else if (event.key === 's'){
        playGame('scissors');
    } else if (event.key === 'e'){
        resetScores();
    } else if (event.key === 'u'){
        autoPlay();
    }
});

function resetScores() {
    if (playerScore.wins === 0 && playerScore.loses === 0 && playerScore.tie === 0){
        document.querySelector('.player-score').innerHTML = 'Error Please Try Again';
        document.querySelector('.computer-score').innerHTML = 'Error Please Try Again';
    } else {
        playerScore.wins = 0;
        playerScore.loses = 0;
        playerScore.tie = 0;
        localStorage.removeItem('playerScore');
        computerScore.wins = 0;
        computerScore.loses = 0;
        computerScore.tie = 0;
        localStorage.removeItem('computerScore');
        updateScoreElement();
        clearInterval(autoplaying);
    }
}

function autoPlay(){
    if(!isAutoplay){
        autoplaying = setInterval(() => {
            const playerMove = pickcomputerMove();
            playGame(playerMove);
        }, 2000);
        isAutoplay = true;
    } else {
        clearInterval(autoplaying);
        isAutoplay = false;
    }
    updateScoreElement();
}

function playGame(playerMove){
    const computerMove = pickcomputerMove();

    if(playerMove === 'rock'){
        if(computerMove === 'rock'){
            playerResult = 'Draw, Try Again!';
            computerResult = 'Draw, Try Again!';
        } else if (computerMove === 'paper'){
            playerResult = 'You Lose!';
            computerResult = 'You Win!';
        } else if (computerMove === 'scissors'){
            playerResult = 'You Win!';
            computerResult = 'You Lose!';
        }
    } else if (playerMove === 'paper'){
        if(computerMove === 'rock'){
            playerResult = 'You Win!';
            computerResult = 'You Lose!';
        } else if (computerMove === 'paper'){
            playerResult = 'Draw, Try Again!';
            computerResult = 'Draw, Try Again!';
        } else if (computerMove === 'scissors'){
            playerResult = 'You Lose!';
            computerResult = 'You Win!';
        }
    } else if (playerMove === 'scissors'){
        if(computerMove === 'rock'){
            playerResult = 'You Lose!';
            computerResult = 'You Win!';
        } else if (computerMove === 'paper'){
            playerResult = 'You Win!';
            computerResult = 'You Lose!';
        } else if (computerMove === 'scissors'){
            playerResult = 'Draw, Try Again!';
            computerResult = 'Draw, Try Again!';
        }
    }

    if(playerResult === 'You Win!'){
        if(computerResult === 'You Lose!'){
            playerScore.wins += 1;
            computerScore.loses += 1;
        }
    } else if (playerResult === 'You Lose!'){
        if(computerResult === 'You Win!'){
            playerScore.loses += 1;
            computerScore.wins += 1;
        }
    } else if (playerResult === 'Draw, Try Again!' && computerResult === 'Draw, Try Again!'){
        playerScore.tie += 1;
        computerScore.tie += 1;
    }

    localStorage.setItem('playerScore', JSON.stringify(playerScore));
    localStorage.setItem('computerScore', JSON.stringify(computerScore));

    updateScoreElement();

    displayHTML(playerMove, playerResult, computerMove, computerResult);
}

function displayHTML(playerMove, playerResult, computerMove, computerResult){
    
    document.querySelector('.player-picked').innerHTML = `You Picked: <img src="images/${playerMove}-emoji.png" alt="paper-image">`;

    document.querySelector('.computer-picked').innerHTML = `Computer picked: <img src="images/${computerMove}-emoji.png" alt="paper-image">`;

    document.querySelector('.player-window-container').innerHTML = `<img src="images/${playerMove}-emoji.png" alt="player-image">`;
    document.querySelector('.computer-window-container').innerHTML = `<img src="images/${computerMove}-emoji.png" alt="player-image">`;

    document.querySelector('.player-result').innerHTML = playerResult;
    document.querySelector('.computer-result').innerHTML = computerResult;
}

function updateScoreElement() {
    document.querySelector('.player-score').innerHTML = `Wins: ${playerScore.wins}, Losses: ${playerScore.loses}, Ties: ${playerScore.tie}`;
    document.querySelector('.computer-score').innerHTML = `Wins: ${computerScore.wins}, Losses: ${computerScore.loses}, Ties: ${computerScore.tie}`;
}

function pickcomputerMove(){
    const randomMove = (Math.floor(Math.random() * 3) + 1);

    let computerMove = '';

    if(randomMove === 1){
        computerMove = 'rock';
    } else if (randomMove === 2){
        computerMove = 'paper';
    } else if (randomMove === 3){
        computerMove = 'scissors';
    }

    return computerMove;
}