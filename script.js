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
let letbox = document.getElementById('letter_box');
let mistakes = 0;
let puzzle; // zmienna globalna z wartością przypisywaną po kliknięciu w przycisk submit
let blanks = '';

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
		letbox.classList.add('animate__backInRight');
		blanksGenerator()
		lettersGenerator()
      } else {
      		popOver.classList.remove('display');
      		setTimeout(function(){ popOver.classList.add('display'); }, 3000);
      		return false;
      	};
});

// funkcja generująca puste pola
function blanksGenerator() {
	document.getElementById('answer_box').innerHTML = blanks;
};

// funkcja generująca klawiaturę
function lettersGenerator() {
	let letterbox = '';
	for (let i = 0; i < letter.length; i++) {
		let element = 'l' + i;
		letterbox = letterbox + '<div class="letter hover" onclick="checkLetter(' + i + ')" id="' + element + '" >' +	letter[i] + '</div>';
		}
	letbox.innerHTML = letterbox;
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
		elem2.classList.remove('hover');
		blanksGenerator();
	} else {
		let element = 'l' + nr;
		let elem2 = document.getElementById(element);
		elem2.classList.add('red');
		elem2.classList.remove('hover');
		elem2.setAttribute('onclick', ';');

		// zła litera
		mistakes++;
		let svgElement = gallows.querySelector('.display');
		svgElement.classList.remove('display');
	}

	// wygrana
	if (puzzle == blanks) {
		letbox.innerHTML = '<p class="reset" onclick="location.reload()">WYGRAŁEŚ! TO CO, JESZCZE RAZ?</p>';
	}

	// przegrana
	if (mistakes >= 7) {
		face.style.display = 'block';
		letbox.innerHTML = '<p class="reset" onclick="location.reload()">GŁOWA DO GÓRY<br>SPRÓBUJ JESZCZE RAZ</p>';
	}

};


