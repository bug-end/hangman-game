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
			let span = document.createElement('span');
			span.className = 'note';
			// span.innerHTML = '_';
			
			document.querySelector('.answer_box').appendChild(span);
		}
	}
	createLetterSpace()

	letters.addEventListener('click', event => {
		if (!event.target.closest('button')) return // zapobiega wyświetlaniu wszystkich liter po kliknięciu w div letter
		const letter = event.target.textContent;
		
		for (let i=0; i < arrayOfLetters.length; i++) {
			if (arrayOfLetters[i] === letter) {
				return console.log(true);

			}
		}
		
	})

});

