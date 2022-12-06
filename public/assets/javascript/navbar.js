const hamburgerBtn = document.getElementsByClassName('hamburg')[0]
const navbarLinks = document.getElementsByClassName('nav-links')[0]

hamburgerBtn.addEventListener('click', () => {
	navbarLinks.classList.toggle('active')
})