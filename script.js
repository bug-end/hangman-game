const input = document.getElementById('word');
const submit = document.getElementById('submit_button');
const gallows = document.querySelector('.gallows');
const answer = document.querySelector('.answer_box');
const letters = document.querySelector('.letters');
const reset = document.querySelector('.reset_button');

submit.addEventListener('click', function() {
	this.disabled = true;
	let puzzle = input.value;
	let arrayOfLetters = puzzle.split('');

	// funkcja stwarzająca miejsca na litery
	function createLetterSpace() {
		for (let i=0; i < puzzle.length; i++) {
			let createSpan = document.createElement('span');
			createSpan.className = 'letter_block';
			document.querySelector('.answer_box').appendChild(createSpan);
		}
	}
	createLetterSpace()

	letters.addEventListener('click', event => {
		if (!event.target.closest('button')) return // zapobiega wyświetlaniu wszystkich liter po kliknięciu w div letter
		event.target.disabled = true;
		const letter = event.target.textContent;
		let svgElement = document.querySelector('.display_off');
		
		for (let i=0; i < arrayOfLetters.length; i++) {
			if (arrayOfLetters[i] === letter) {
				const spanElement = answer.querySelector('.letter_block');
				spanElement.innerHTML = letter;
				return console.log(true, letter);
			}
		};

		for (let i=0; i < arrayOfLetters.length; i++) {
			if (arrayOfLetters[i] !== letter && svgElement !== null) {
				svgElement.classList.remove('display_off');
			} return
		};
		
	})

});

