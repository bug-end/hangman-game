const input = document.getElementById('word');
const submit = document.getElementById('submit_button');
const gallows = document.querySelector('.gallows');
const answer = document.querySelector('.answer_box');
const letters = document.querySelector('.letters');
const reset = document.querySelector('.reset_button');
// const oneletter = document.querySelectorAll('.letters__item');

submit.addEventListener('click', function() {
	const word = input.value.split('');
	// console.log(word, word[3]);
	this.disabled = true;
});

