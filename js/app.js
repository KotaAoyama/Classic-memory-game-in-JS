let cards = [
    'fa-diamond', 'fa-diamond',
    'fa-bomb', 'fa-bomb',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bolt', 'fa-bolt',
];


function generateCard(card){
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}


function initGame() {
    let deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join('');
}


initGame();


const resetButton = document.querySelector('.restart');
resetButton.addEventListener('click', function () {
    restartTimer();
    resetStarRating();
    resetMoveCount();
    resetCards();
});


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


let allCards = document.querySelectorAll('.card');
let openCards = [];
let moveCount = 0;
let movesOutput = document.querySelector('.moves');
movesOutput.innerHTML = moveCount;
const stars = document.querySelectorAll('.fa-star');

// modal
const modal = document.querySelector('modal');

allCards.forEach(function (card) {
    card.addEventListener('click', function () {

        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');
            moveCount += 1;
            movesOutput.innerHTML = moveCount;
            // StarRating
            starRating(moveCount);
            
            if (openCards.length == 2) {
                // the two cards match
                if (openCards[0].dataset.card == openCards[1].dataset.card){
                    openCards[0].classList.add('match');
                    openCards[1].classList.add('match');
                    openCards = [];
                    

                    // all cards match
                    if (document.querySelectorAll('.match').length == cards.length){
                        stopTimer();
                        const timeResult = document.querySelector('.timeResult');
                        const starsResult = document.querySelector('.starsResult');
                        const starsOutput = document.querySelector('.stars');
                        const movesResult = document.querySelector('.movesResult');
                        timeResult.innerHTML = timerOutput.innerHTML;
                        starsResult.innerHTML = starsOutput.innerHTML;
                        movesResult.innerHTML = movesOutput.innerHTML;

                        modal.style.display = "block";
                    }
                }else{
                    // the two cards don't match
                    setTimeout(function () {
                        openCards.forEach(function (openCard) {
                            openCard.classList.remove('open', 'show');
                        });
                        openCards = [];
                    }, 1000);
                }
            }
        }
    });
});


// Timer
const timerOutput = document.querySelector('.timer-output');
let sec = 0;
let min = 0;
let timer;

startTimer();

function startTimer() {
    timer = setInterval(insertTime, 1000);
}

function insertTime() {
    sec++;

    if (sec < 10){
        sec = `0${sec}`;
    }

    if (sec >= 60){
        min++;
        sec = "00";
    }

    if (min == 9 && sec == 59){
        stopTimer();
    }

    timerOutput.innerHTML = "0" + min + ":" + sec;
}

function stopTimer() {
    clearInterval(timer);
    sec = 0;
    min = 0;
}

function restartTimer() {
    stopTimer();
    timerOutput.innerHTML = "00:00";
    startTimer();
}


function starRating(moveCount) {
    if (moveCount > 24){
        stars[0].style.cssText = "visibility: hidden";
    }
    if (moveCount > 32){
        stars[1].style.cssText = "visibility: hidden";
    }
}


function resetStarRating() {
    stars[0].style.cssText = "";
    stars[1].style.cssText = "";
}


function resetMoveCount() {
    moveCount = 0;
    movesOutput.innerHTML = moveCount;
}


function resetCards() {
    allCards.forEach(function (card) {
        card.classList.remove('open', 'show', 'match');
    })
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}