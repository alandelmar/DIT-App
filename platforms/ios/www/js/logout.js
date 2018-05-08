// Fetching local storage
var isStudent = localStorage.getItem("isStudent");

function logout() {
    $.ajax({
        url: "http://localhost:8888/php/logout.php",
        type: "GET",
        success: function (response) {
            if (response === "loggedOut") {


                if (isStudent === "yes") {
                    // If user is a student, will redirect to student login page
                    setTimeout("location.href = 'index.html';", 1000);
                } else if (isStudent === "no") {
                    // If user is staff, will redirect to staff login page 
                    setTimeout("location.href = 'staffLogin.html';", 1000);
                } else {
                    // Fallback - sends user to student login
                    setTimeout("location.href = 'index.html';", 1000);
                }

                // Clear local storage
                localStorage.removeItem('hasLoggedIn');
                localStorage.clear();
                document.getElementById("logout_Button").innerHTML = "Logging out ...";
                document.getElementById("profileLogout").innerHTML = "Logging out ...";
            } else {}
        },
        error: function (response) {
            alert("There was a problem. Please try again");
        }
    });
}