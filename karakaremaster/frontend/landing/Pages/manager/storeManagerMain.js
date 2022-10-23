"use strict";
// Get the modal
let modal = document.getElementById("myModal");
// Get the button that opens the modal
let btn = document.getElementById("plusBtn");
// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
};
// When the user clicks anywhere outside of the modal, close it

let modal2 = document.getElementById("myModal2");
// Get the button that opens the modal
let btn2 = document.getElementById("plusBtn2");
// When the user clicks on the button, open the modal
btn2.onclick = function () {
    modal2.style.display = "block";
};


window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
		console.log("hidden");
    }
	 if (event.target === modal2) {
        modal2.style.display = "none";
		console.log("hidden");
    }
};
