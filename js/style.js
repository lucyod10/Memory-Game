const cardBoard = document.getElementById("cardBoard");
const numberOfCards = 30;

for (let i=0; i < numberOfCards; i++) {
	const cards = document.createElement("img").className("card");
	cards.setAttribute("src", "https://images.unsplash.com/photo-1548858565-461b87144b6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80");
	cardBoard.appendChild(cards);
}
