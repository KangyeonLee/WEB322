

window.onload = function(){ 

    // Get the sign up
    var signUpModal = document.getElementById("signUpModal");
    // sign in
    var signInModal = document.getElementById("signInModal");


    var signUpBtn = document.getElementById("signUpBtn");
    var signInBtn = document.getElementById("signInBtn");
    var failedModal = document.getElementById("failedModal");

    
    var span = document.getElementsByClassName("close")[0];


    signUpBtn.onclick = function() {
        signUpModal.style.display = "block";
    }
    signInBtn.onclick = function() {
        signInModal.style.display = "block";
    }

    span.onclick = function() {
        signUpModal.style.display = "none";
        signInModal.style.display = "none";
        failedModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == signUpModal ) {
            signUpModal.style.display = "none";
        }
        if (event.target == signInModal ) {
            signInModal.style.display = "none";
        }
        if (event.target == failedModal ) {
            failedModal.style.display = "none";
        }
    }

};