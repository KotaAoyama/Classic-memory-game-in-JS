// Cards
let icons = [ 'fa-diamond','fa-bomb','fa-paper-plane-o','fa-anchor','fa-cube','fa-leaf','fa-bicycle','fa-bolt'];
let cards = [...icons, ...icons];
initGame();

let allCards = document.querySelectorAll('.card');
let openCards = [];
setCardsLogic();

// Timer
const timerOutput = document.querySelector('.timer-output');
let sec = 0;
let min = 0;
let timer;
startTimer();

// Moves
const movesOutput = document.querySelector('.moves');
let moveCount = 0;
movesOutput.innerHTML = moveCount;

// Star-Rating
const stars = document.querySelectorAll('.fa-star');

// Reset-Button
const resetButton = document.querySelector('.restart');
resetButton.addEventListener('click', allReset);

// Modal
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close');
const modalRestartButton = document.querySelector('.modal-restart');
modalRestartButton.addEventListener('click', restartAndHideModal);
closeButton.addEventListener('click', hideModal);
window.addEventListener('click', hideModal2);



//
// Cards functions
//
function initGame() {
    let deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join('');
}

function generateCard(card){
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

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

function setCardsLogic(){
    allCards.forEach(function (card) {
        card.addEventListener('click', function () {
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                openCards.push(card);
                card.classList.add('open', 'show');
                moveCount += 1;
                movesOutput.innerHTML = moveCount;
                starRating(moveCount);

                // two cards opened
                if (openCards.length == 2) {

                    // the two cards match
                    if (openCards[0].dataset.card == openCards[1].dataset.card){
                        openCards[0].classList.add('match');
                        openCards[1].classList.add('match');
                        openCards = [];

                        // all cards match
                        if (document.querySelectorAll('.match').length == cards.length){
                            stopTimer();
                            showModal();
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
}


//
// Timer functions
//
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


//
// Star-Rating functions
//
function starRating(moveCount) {
    if (moveCount > 24){
        stars[0].classList.replace('fa-star', 'fa-star-o');
    }
    if (moveCount > 32) {
        stars[1].classList.replace('fa-star', 'fa-star-o');
    }
}

function resetStarRating() {
    stars[0].classList.replace('fa-star-o', 'fa-star');
    stars[1].classList.replace('fa-star-o', 'fa-star');
}


//
// Moves function
//
function resetMoveCount() {
    moveCount = 0;
    movesOutput.innerHTML = moveCount;
}


//
// Reset-Button function
//
function resetCards() {
    allCards.forEach(function (card) {
        card.classList.remove('open', 'show', 'match');
    })
}

function allReset() {
    restartTimer();
    resetStarRating();
    resetMoveCount();
    resetCards();
    openCards = [];
}


//
// Modal functions
//
function showModal() {
    const timeResult = document.querySelector('.timeResult');
    const starsResult = document.querySelector('.starsResult');
    const movesResult = document.querySelector('.movesResult');
    timeResult.innerHTML = timerOutput.innerHTML;
    starsResult.innerHTML = document.getElementsByClassName('fa-star').length.toString();
    movesResult.innerHTML = movesOutput.innerHTML;
    modal.style.display = "block";
}

function restartAndHideModal(){
    allReset();
    hideModal();
}

function hideModal() {
    modal.style.display = "none";
}

function hideModal2(e) {
    if (e.target == modal){
        hideModal();
    }
}
