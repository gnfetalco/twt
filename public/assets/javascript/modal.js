document.getElementById('button').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "flex";
});

document.querySelector('.go-back').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});

document.querySelectorAll("#time option").forEach(opt => {
	var date = new Date();
	var hours = date.getHours();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	var strTime = hours + ampm;
		
	if (opt.value != strTime) {
        opt.disabled = true;
    }
});

function checkDate() {
	let date = new Date();
	let year = String(date.getFullYear());
	let month = String(date.getMonth() + 1);
	let day = String(date.getDate()).padStart(2, '0');
	let theDate = [year, month, day].join('-');
	let datePicked = document.getElementByID('date').innerHTML
	if (theDate == datePicked) {
		
	}
}


/* document.getElementById('date').addEventListener("change", function() {
    var input = this.value;
    var dateEntered = new Date(input);
	
	document.getElementById('demo').innerHTML = dateEntered
	
    console.log(input); //e.g. 2015-11-13
    console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
});

document.getElementByID('date').onchange = function() {
	let check_today = getDateToday(date);
	
	document.getElementByID.innerHTML = check_today;
	
	
	
}

function getDateToday(date) {
	let date = new Date();
	let year = String(date.getFullYear());
	let month = String(date.getMonth() + 1);
	let day = String(date.getDate()).padStart(2, '0');
	let theDate = [year, month, day].join('-');
	return theDate;
} */
