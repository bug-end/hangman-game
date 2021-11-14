const input = document.getElementById('word');
const submit = document.getElementById('submit_button');
const gallows = document.querySelector('.gallows');
const reset = document.querySelector('.reset_button');
const inputBox = document.getElementById('input_box');
let mistakes = 0;
let puzzle; // zmienna globalna z wartością przypisywaną po kliknięciu w przycisk submit
let blanks = '';
const alphabet = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ';
const letter = alphabet.split('');

submit.addEventListener('click', function() {
	puzzle = input.value;
	puzzle = puzzle.toUpperCase();
	console.log(puzzle);
	for (let i = 0; i < puzzle.length; i++) {
		if (puzzle.charAt(i)==' ') {
			blanks = blanks + ' ';
		} else {
			blanks = blanks + '-';
		}
	};
	submit.disabled = true;
	inputBox.style.display = 'none';
	blanksGenerator()
})

function blanksGenerator() {
	document.getElementById('answer_box').innerHTML = blanks;
};

window.onload = lettersGenerator;

// funkcja generująca klawiaturę
function lettersGenerator() {
	let letterbox = '';
	for (let i = 0; i < letter.length; i++) {
		let element = 'l' + i;
		letterbox = letterbox + '<div class="letter" onclick="checkLetter(' + i + ')" id="' + element + '" >' +	letter[i] + '</div>';
		}
	document.getElementById('letter_box').innerHTML = letterbox;
};

// utworzenie metody changeBlank zmieniającej znak pod wskazaną pozycją w stringu
String.prototype.changeBlank = function(position, sign) {
	if (position > this.length - 1) {
		return this.toString();
	} else {
		return this.substr(0, position) + sign + this.substr(position + 1);
	}
};

function checkLetter(nr) {
	let correct = false;

	for (let i = 0; i < puzzle.length; i++) {
		if (puzzle.charAt(i) == letter[nr]) {
			blanks = blanks.changeBlank(i, letter[nr]);
			correct = true;
		}
	}

	if (correct == true) {
		let element = 'l' + nr;
		let elem2 = document.getElementById(element);
		elem2.classList.add('green');
		blanksGenerator();
	} else {
		let element = 'l' + nr;
		let elem2 = document.getElementById(element);
		elem2.classList.add('red');
		elem2.setAttribute('onclick', ';');

		// zła litera
		mistakes++;
		let svgElement = gallows.querySelector('.display');
		svgElement.classList.remove('display');
	}

	// wygrana
	if (puzzle == blanks) {
		document.getElementById('letter_box').innerHTML = 'Brawo! Odgadłeś hasło' + '<br><br><span class="reset" onclick="location.reload()">ZAGRAJ JESZCZE RAZ</span>';
	}

	// przegrana
	if (mistakes >= 7) {
		document.getElementById('letter_box').innerHTML = 'Niestesty' + '<br><br><span class="reset" onclick="location.reload()">SPRÓBUJ JESZCZE RAZ</span>';
	}

};


