// Card Objects ////////////////////////////////////////////////////////////////
const imageObjects = [
//puppy
{
	type: "puppy",
	URL: "images/puppy_01.jfif"
},
{
	type: "puppy",
	URL: "images/puppy_02.jfif"
},
{
	type: "puppy",
	URL: "images/puppy_03.jfif"
},
{
	type: "puppy",
	URL: "images/puppy_04.jfif"
},
{
	type: "puppy",
	URL: "images/puppy_05.jfif"
},
{
	type: "puppy",
	URL: "images/puppy_06.jfif"
},
{
	type: "puppy",
	URL: "images/puppy_07.jfif"
},
{
	type: "puppy",
	URL: "images/puppy_08.jfif"
},
//deer
{
	type: "deer",
	URL: "images/deer_01.jfif"
},
{
	type: "deer",
	URL: "images/deer_02.jfif"
},
//panda
{
	type: "panda",
	URL: "images/panda_01.jfif"
},
{
	type: "panda",
	URL: "images/panda_02.jfif"
},
//bear
{
	type: "bear",
	URL: "images/bear_01.jfif"
},
{
	type: "bear",
	URL: "images/bear_02.jfif"
},
//kitten
{
	type: "kitten",
	URL: "images/cat_01.jfif"
},
{
	type: "kitten",
	URL: "images/cat_02.jfif"
},
{
	type: "kitten",
	URL: "images/cat_03.jfif"
},
{
	type: "kitten",
	URL: "images/cat_04.jfif"
},
//duck
{
	type: "duck",
	URL: "images/duck_01.jfif"
},
{
	type: "duck",
	URL: "images/duck_02.jfif"
},
//otter
{
	type: "otter",
	URL: "images/otter_01.jfif"
},
{
	type: "otter",
	URL: "images/otter_02.jfif"
}
];

// Game Board //////////////////////////////////////////////////////////////////

const cardBoard = document.getElementById("cardBoard");
let newDeckArray = [];
let currentNewId;
let cardsAlreadyPlaced = [];
console.log("up and running");
let cardsInPlay = [];
let mode = "exactMatch";
let globCardNum = 0;

function addIds () {
	for (let i = 0; i < imageObjects.length; i++) {
		imageObjects[i].cardId = i;
	}
}

function newDeck (numberOfCards) {
	globCardNum = numberOfCards;
	addIds();

 	for (let i=0; i < numberOfCards; i++) {

		/**
		depending on the length of the numberOfCards
		create an array that contains all pairs
		then find the random number from that array
		**/
		if((i % 2) === 0) {
			let randomType;
			const min = 0;
			const max = 7;
			let randomNum = Math.floor(Math.random() * max);
			switch(randomNum)
			{
				case 0:
					randomType = "puppy";
					break;
				case 1:
					randomType = "deer";
					break;
				case 2:
					randomType = "panda";
					break;
				case 3:
					randomType = "bear";
					break;
				case 4:
					randomType = "kitten"
					break;
				case 5:
					randomType = "duck"
					break;
				case 6:
					randomType = "otter"
					break;
				default:
			}
			//add pairs of cards to newDeckArray
			randomisePairs(randomType);
		}
	}

	for (let i=0; i < numberOfCards; i++)
	{
		//populate cards on board with random values from newDeckArray
		addDeck();
	}

	interval = setInterval(setTime, 1000);
 }

 function addDeck () {
 	//add card objects
 	const cardHolder = document.createElement("div");
 	const cardHolder2 = document.createElement("div");
	const cardfront = document.createElement("img");
	const cardback = document.createElement("img");
	cardfront.setAttribute("class", "card front");
	cardback.setAttribute("class", "card back");

	//when a card is clicked, fire flipCard
	cardHolder2.addEventListener('click', flipCard);

	//get a random image to assign to the front
	let randomImage = randomiseImage();
	let id = randomImage.cardId;
	cardHolder2.setAttribute("cardId", id);
	let image = imageObjects[id].URL;
	cardfront.setAttribute("src", image);
	cardHolder2.setAttribute("name", "notFlipped");
	//add back image to the back
	cardback.setAttribute("src", "images/back_04.jpg");

	//add objects to board
	cardHolder.setAttribute("class", "cardHolder");
	cardBoard.appendChild(cardHolder);
	cardHolder2.setAttribute("class", "cardHolder2 rotate");
	cardHolder.appendChild(cardHolder2);
	cardHolder2.appendChild(cardfront);
	cardHolder2.appendChild(cardback);
 }

//randomly selects cards to be placed on cardBoard
// so they are in random order
function randomiseImage () {
	//cardsAlreadyPlaced is defined globally
	//so this method doesn't rewrite it

	//randomise the image to be applied when a new card is called
	//this is species specific, not an exact match
	let imageObject;

	const min = 1;
	const max = newDeckArray.length;
	let randomNum = Math.floor(Math.random() * max);
	//TODO check its not a card you already put down
	//check if the number is already in the array
	for (let i = 0; i < cardsAlreadyPlaced.length; i++)
	{
		//not looping back through, so if randomNum gets changed
		//to something lower, it will be successful
		while (randomNum === cardsAlreadyPlaced[i])
		{
			//if it is, change the random number, and reset the for loop
			randomNum = Math.floor(Math.random() * max);
			i = 0;
		}
	}

	cardsAlreadyPlaced.push(randomNum);
	imageObject = newDeckArray[randomNum];
	currentNewId = randomNum;
	return imageObject;

}

//finds random pairs of species,
//pushes object to newDeckArray
function randomisePairs (randomTypeOfCard) {
	//create a random set of cards, based on the type
	//of card provided in the newDeck function.
	let allObjectsOfType = [];
	//find all object of type and add to new array
	for (let i = 0; i < imageObjects.length; i++) {
		if (imageObjects[i].type === randomTypeOfCard) {
			allObjectsOfType.push(imageObjects[i]);
		}
	}

	const min = 0;
	const max = allObjectsOfType.length;
	const randomNum1 = Math.floor(Math.random() * max);
	let randomNum2 = Math.floor(Math.random() * max);
	//check so that pairs of cards are not the same in
	//species mode
	//if more than one match of same species,
	//repeat in image may occur.
	while (randomNum2 === randomNum1) {
		randomNum2 = Math.floor(Math.random() * max);
	}

	//add first random number to new array
	newDeckArray.push(allObjectsOfType[randomNum1]);
	//if species mode, randomise the next entry
	if (mode === "species") {
		newDeckArray.push(allObjectsOfType[randomNum2]);
	}
	//if exact mode, add the same card again so it matches exactly
	else {
		newDeckArray.push(allObjectsOfType[randomNum1]);
	}
}


function flipCard () {

	updateStars();

	//turn card around to correct URL
	let cardID = this.getAttribute('cardId');
	let card = imageObjects[cardID];

	//check if the card has not already been flipped
	if (this.getAttribute('name') === "notFlipped")
	{
		//add one to the moves score
		addMove();
		//set it to flipped
		this.setAttribute('name', "flipped");

		//flip card
		animateFlip(this);
		//assign type to use in checkForMatch
		let type = card.type;
		cardsInPlay.push(card);
		if(cardsInPlay.length === 2) {
			//this is where the alert is
			//set timeout so that there is a small pause
			//to allow for the image change to be loaded.
			setTimeout(checkForMatch, 300);
		}
	}
	else
	{
		console.log("This card is already flipped!")
		errorSound.play();
	}

}

function addMove () {
//add one to the moves count
	const moves = document.getElementById('moves');
	moves.innerHTML = parseInt(moves.textContent) + 1;
}


function checkForMatch () {
	//if the local arrays types are equal
	//if mode is species, only check for type
	//if mode is exactMatch, check for URL to match
	if (((cardsInPlay[0].type === cardsInPlay[1].type) &&
		(mode === "species")) ||
		((cardsInPlay[0].URL === cardsInPlay[1].URL) &&
		(mode === "exactMatch")))
	{
		const allCards = document.getElementsByClassName("cardHolder2");
		const id0 = cardsInPlay[0].cardId;
		const id1 = cardsInPlay[1].cardId;
		//loop all cards
		for (let i = 0; i < allCards.length; i++) {
			//of these, which are flipped
			if (allCards[i].getAttribute("name") === "flipped") {
				//only affect the cards in the public loop,
				//with the cards in the cardsInPlay array
				if (allCards[i].getAttribute("cardid") == id0 || allCards[i].getAttribute("cardid") == id1) {
					//make matched
					allCards[i].setAttribute("name", "matched");
					animateMatch(allCards[i]);
				}
			}
		}

		correctSound.play();
		let allMatchedCards = [];
		//check if last match, then Win!
		for (let i = 0; i < allCards.length; i++) {
		//check if allcards[i] has the name matched,
		//add to an array to check for length
			if (allCards[i].getAttribute("name") === "matched") {
				allMatchedCards.push(allCards[i]);
			}

		}
		if (allMatchedCards.length === allCards.length) {
			setTimeout(finishGame, 500);
			console.log("winner!");
		}

	}
	else
	{
		noMatch();
	}
	clearCardsInPlay();
}

function clearCardsInPlay () {
	cardsInPlay = [];
}

function toggleClass(object, className) {
	if (object.classList.contains(className))
	{
		object.classList.toggle(className);
	}
}

function noMatch () {
	errorSound.play();
	let allCards = document.getElementsByClassName("cardHolder2");
		for (let i = 0; i < allCards.length; i++) {
			//of these, which are also flipped
			if (allCards[i].getAttribute("name") === "flipped") {
				animateShake(allCards[i]);
				//wrap the function animateFlip in a new function,
				//because otherwise animateFlip is executed, before the timeout
				//and the "allCards" is executed after the timeout
				//which causes the animations to play at the same time
				setTimeout(
					function() {
						animateFlip(allCards[i])
					}, 500);

				//make notFlipped so it can be reset for next match
				allCards[i].setAttribute('name', "notFlipped");
				//timeout to let animations complete, then reset all classes
				//for next match
				setTimeout(
					function() {
						toggleClass(allCards[i], "bounce");
						toggleClass(allCards[i], "shake");
					}, 1000);
			}
		}
}

function resetGame () {
	stopTime();
	clearBoard();
	resetScores();
	let radioBtn = document.querySelectorAll('input[name="mode"]');
	for (let i=0; i < radioBtn.length; i++) {
		if (radioBtn[i].checked)
		{
			mode = radioBtn[i].value;
		}
	}

	let input = document.getElementById("numberOfCards").value.trim();
	//check if the input field was empty, or null
	if (input.length <= 0 || input < 2 || input == "" || input == isNaN(input)) {
		input = 8;
	}
	//make number an integer
	input = parseInt(input);
	//if the input is not an even number, make even
	if (input % 2 != 0) {
		input++;
	}

	newDeck(input);

}

function clearBoard() {
	//reset the game
	//clear list
	clearCardsInPlay();
	//Remove played cards

	while (cardBoard.firstChild) {
		cardBoard.removeChild(cardBoard.firstChild)
	}
}

function resetScores () {
	const moves = document.getElementById('moves');
	moves.innerHTML = "0";
}

function finishGame () {
	clearBoard();


	//change won games score
	const wontxt = document.getElementById('won');
	wontxt.innerHTML = parseInt(wontxt.textContent) + 1;

	//make winner text
	const winnertxt = document.createElement("div");
	winnertxt.setAttribute("class", "winnertxt");
	winnertxt.innerHTML = `you won! <br>
	<span class="winnersmall">
	Your time was: ${min.textContent}:${sec.textContent}
	<br>
	Your score was:
	${document.getElementById("stars").innerHTML}
	<br>
	You made ${document.getElementById('moves').textContent} moves
	</span>
	`;
	stopTime();
	resetScores();

	//make winner image
	const winnerImg = document.createElement("img");
	winnerImg.setAttribute("src", "/images/happy_01.jpeg");
	winnerImg.setAttribute("class", "winner");
	cardBoard.appendChild(winnertxt);
	cardBoard.appendChild(winnerImg);


}

// Audio ///////////////////////////////////////////////////////////////////////
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


var errorSound = new sound("audio/wrong3.mp3");
var correctSound = new sound("audio/correct2.mp3");

// Instructions hide menu //////////////////////////////////////////////////////
function instHide () {
	let instructions = document.getElementById("instructions");
	if (instructions.clientHeight) {
      instructions.style.height = 0;
    } else {
      instructions.style.height = instructions.scrollHeight + "px";
    }
    let icon = document.getElementById("instClick").innerHTML;
    //console.log(icon);
    icon = (icon === "+") ? "-" : "+";
    document.getElementById("instClick").innerHTML = icon;

}

document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('instClick').addEventListener('click', instHide);

// Animations //////////////////////////////////////////////////////////////////
function animateFlip (card) {
	card.classList.toggle("rotate");

}

function animateMatch (card) {
	card.classList.toggle("bounce");
}

function animateShake (card) {
	card.classList.toggle("shake");
}

//Timer ////////////////////////////////////////////////////////////////////////
const min = document.getElementById("min");
const sec = document.getElementById("sec");
let totalSeconds = 0;

function setTime () {
	++totalSeconds;
	sec.innerHTML = pad(totalSeconds % 60);
	min.innerHTML = pad(parseInt(totalSeconds / 60));
}

function stopTime () {
	clearInterval(interval);
	totalSeconds = 0;
	sec.innerHTML = "00";
	min.innerHTML = "00";
}
function pad(val) {
	let valString = val.toString();
	if (valString.length < 2) {
		return "0" + valString;
	}
	else {
		return valString;
	}
}

let interval;

//Stars score //////////////////////////////////////////////////////////////////

function updateStars () {
	const stars = document.getElementById("stars");
	const moves = document.getElementById("moves").textContent;
	const rating = moves / (globCardNum * 3) * 100;
	console.log("stars " + stars);
	console.log("moves " + moves);
	console.log("globCardNum " + globCardNum);
	console.log("rating " + rating);

	if (rating <= 25 || moves === 0) {
		stars.innerHTML = "&#9733;&#9733;&#9733;";
	}
	else if (rating <= 50) {
		stars.innerHTML = "&#9733;&#9733;&#9734;";
	}
	else if (rating <= 75) {
		stars.innerHTML = "&#9733;&#9734;&#9734;";
	}
	else if (rating <= 100) {
		stars.innerHTML = "&#9734;&#9734;&#9734;";
	}
	else {
		stars.innerHTML = "&#9760;&#9760;&#9760;";
	}
}


// PALETTE //////////////////////////////////////////////////////////////////

document.getElementById("paletteBlack").addEventListener("click", function(){
	paletteChangeColour("black");
});
document.getElementById("paletteYellow").addEventListener("click", function(){
	paletteChangeColour("yellow");
});
document.getElementById("paletteBlue").addEventListener("click", function(){
	paletteChangeColour("blue");
});



function paletteChangeColour (c) {
	if (c === "black") {
		document.querySelector("html").setAttribute("class", "black");
	}
	else if (c === "yellow") {
		document.querySelector("html").setAttribute("class", "yellow");
	}
	else if (c === "blue") {
		document.querySelector("html").setAttribute("class", "blue");
	}

}

// start Game //////////////////////////////////////////////////////////////////
newDeck(10);

//TODO score from numcards
//TODO login form
//TODO write script to find image groups
//TODO hide/show instructions
//TODO animate radio buttons
//TODO animate cards out
//TODO Leaderboard
//TODO keyboard shortcuts to improve gameplay
//TODO collapse new game bucket to just show new game button

//TODO change newgame button to restart when game is playing
//TODO Readme
