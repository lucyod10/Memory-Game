const imageObjects = [
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


{
	type: "deer",
	URL: "images/deer_01.jfif"
},
{
	type: "deer",
	URL: "images/deer_02.jfif"
},

{
	type: "panda",
	URL: "images/panda_01.jfif"
},
{
	type: "panda",
	URL: "images/panda_02.jfif"
},

{
	type: "bear",
	URL: "images/bear_01.jfif"
},
{
	type: "bear",
	URL: "images/bear_02.jfif"
},

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


{
	type: "duck",
	URL: "images/duck_01.jfif"
},
{
	type: "duck",
	URL: "images/duck_02.jfif"
},

{
	type: "otter",
	URL: "images/otter_01.jfif"
},
{
	type: "otter",
	URL: "images/otter_02.jfif"
}

];

const cardBoard = document.getElementById("cardBoard");
let newDeckArray = [];
let currentNewId;
let cardsAlreadyPlaced = [];
console.log("up and running");
let cardsInPlay = [];
let mode = "exactMatch";

function addIds () {
	for (let i = 0; i < imageObjects.length; i++) {
		imageObjects[i].cardId = i;
	}
}

function newDeck (numberOfCards) {

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
	cardback.setAttribute("src", "images/back_03.jpg");
	
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
		(mode === "species")
		) ||
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

		//add score
		const score = document.getElementById('score');
		score.innerHTML = parseInt(score.textContent) + 1;

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
			//finishGame();
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
	clearBoard();
	
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
	//reset scores and moves
	const score = document.getElementById('score');
	score.innerHTML = "0";
	const moves = document.getElementById('moves');
	moves.innerHTML = "0";
	//Remove played cards

	while (cardBoard.firstChild) {
		cardBoard.removeChild(cardBoard.firstChild)
	}
}

function finishGame () {
	clearBoard();
	//change won games score
	const wontxt = document.getElementById('won');
	wontxt.innerHTML = parseInt(wontxt.textContent) + 1;
	//make winner text
	const winnertxt = document.createElement("div");
	winnertxt.setAttribute("class", "winnertxt");
	winnertxt.textContent = "you won!";

	//make winner image
	const winnerImg = document.createElement("img");
	winnerImg.setAttribute("src", "images/happy_01.jpeg");
	winnerImg.setAttribute("class", "winner");
	cardBoard.appendChild(winnertxt);
	cardBoard.appendChild(winnerImg);
	
}


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

document.getElementById('reset').addEventListener('click', resetGame);


function animateFlip (card) {
	card.classList.toggle("rotate");

}

function animateMatch (card) {
	card.classList.toggle("bounce");
}

function animateShake (card) {
	card.classList.toggle("shake");
}

newDeck(10);