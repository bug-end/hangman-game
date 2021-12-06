const input = document.getElementById('word');
const submit = document.getElementById('submit_button');
const gallows = document.querySelector('.gallows');
const gallAnimation = document.querySelector('.gall_anim');
const transparentBox = document.querySelector('.transparent_box');
const face = document.querySelector('.face');
const popOver = document.querySelector('.popover');
const alphabet = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ';
const letter = alphabet.split('');
const paper = document.querySelector('.paper');
let keyboard = document.getElementById('letters_box');
let mistakes = 0;
let puzzle; // zmienna globalna z wartością przypisywaną po kliknięciu w przycisk submit
let blanks = '';
let arr = [];

submit.addEventListener('click', function() {
	puzzle = input.value;
	puzzle = puzzle.toUpperCase();
	let regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+( [a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/;
	if(input.value.match(regex)) {
      for (let i = 0; i < puzzle.length; i++) {
			if (puzzle.charAt(i)==' ') {
				blanks = blanks + ' ';
			} else {
				blanks = blanks + '-';
			}
		};
		submit.disabled = 'true';
		transparentBox.style.display = 'none';
		gallows.classList.remove('display');
		gallAnimation.classList.add('animate__backInLeft');
		paper.classList.add('animate__rollIn', 'animate__delay-1s');
		keyboard.classList.add('animate__backInRight');
		blanksGenerator()
		lettersGenerator()
		window.addEventListener('keydown', (event) => {
			let key = event.key.toUpperCase();
			let regex2 = /^[A-ZĄĆĘŁŃÓŚŹŻ]$/;
			if (key.match(regex2) && mistakes <= 6 && puzzle != blanks) {
				checkLetter(key);
			} else {
				return false;
			}
		});
      } else {
      		popOver.classList.remove('display');
      		setTimeout(function(){ popOver.classList.add('display'); }, 3000);
      		return false;
      	};
});

keyboard.addEventListener('click', (event) => {
	if (!event.target.closest('button')) return;
	checkLetter(event.target.textContent);
})

// funkcja generująca puste pola
function blanksGenerator() {
	document.getElementById('answer_box').innerHTML = blanks;
};

// funkcja generująca klawiaturę
function lettersGenerator() {
	let lettersBox = '';
	for (let i = 0; i < letter.length; i++) {
		lettersBox = lettersBox + '<button class="letter hover" id="' + letter[i] + '" >' +	letter[i] + '</button>';
		}
	keyboard.innerHTML = lettersBox;
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
	
	for (let i = 0; i < arr.length; i++) {
		if (nr == arr[i]) {
			return;
		}
	}
	arr.push(nr);

	for (let i = 0; i < puzzle.length; i++) {
		if (puzzle.charAt(i) == nr) {
			blanks = blanks.changeBlank(i, nr);
			correct = true;
		}
	}

	if (correct == true) {
		let elem2 = document.getElementById(nr);
		elem2.classList.add('green');
		elem2.classList.remove('hover');
		blanksGenerator();
	} else {
		let elem2 = document.getElementById(nr);
		elem2.classList.add('red');
		elem2.classList.remove('hover');

		// zła litera
		mistakes++;
		let svgElement = gallows.querySelector('.display');
		svgElement.classList.remove('display');
	}

	// wygrana
	if (puzzle == blanks) {
		keyboard.innerHTML = '<p class="reset" onclick="location.reload()">WYGRAŁEŚ! TO CO, JESZCZE RAZ?</p>';

	}

	// przegrana
	if (mistakes >= 7) {
		face.style.display = 'block';
		keyboard.innerHTML = '<p class="reset" onclick="location.reload()">GŁOWA DO GÓRY<br>SPRÓBUJ JESZCZE RAZ</p>';
	}

};
