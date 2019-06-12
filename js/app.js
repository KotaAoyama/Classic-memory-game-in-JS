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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let allCards = document.querySelectorAll('.card');
let openCards = [];
let moveCount = 0;
let moves = document.querySelector('.moves');
moves.innerHTML = moveCount;


allCards.forEach(function (card) {
    card.addEventListener('click', function (e) {

        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');
            moveCount += 1;
            moves.innerHTML = moveCount;
            
            if (openCards.length == 2) {
                // the two cards match
                if (openCards[0].dataset.card == openCards[1].dataset.card){
                    openCards[0].classList.add('match');
                    openCards[1].classList.add('match');
                    openCards = [];
                    console.log(cards.length);

                    // all cards match
                    if (document.querySelectorAll('.match').length == cards.length){
                        // modal appears
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