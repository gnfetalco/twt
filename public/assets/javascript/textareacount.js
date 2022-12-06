const formTextarea = document.getElementById('form-textarea');
const remainChar = document.getElementById('rem-char');
const maxChar = 150;

formTextarea.addEventListener('input', () => {
	const remaining = maxChar - formTextarea.value.length;
	remainChar.textContent = `${remaining} / 150`;
});