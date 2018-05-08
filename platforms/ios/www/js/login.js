var isStudent;
var hasLoggedIn;

//Local storage - Will automatically redirect to homepage if user has logged in before
if (localStorage.getItem("hasLoggedIn") === "yes") {
    window.location.replace("app.html");
} else {

}

// Student login script
function studentLogin() {

    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    $.ajax({

        url: "http://localhost:8888/php/studentHandle.php",
        type: "POST",
        data: {
            username: user,
            password: pass
        },
        success: function (response) {
            if (response === "success") {

                // Set local storage to flag user as student
                localStorage.setItem("isStudent", "yes");
                // Set local storage to flag user as previously logged in
                localStorage.setItem("hasLoggedIn", "yes");

                document.getElementById("but_submit").innerHTML = "Logging in ...";
                $("#but_submit").css("background-color", "darkgrey");

                setTimeout("location.href = 'app.html';", 1000);
            } else if (response === "incorrect") {
                window.alert("Incorrect login, please try again");
                document.getElementById("forgotPassword").innerHTML = "Forgot Password?";
            } else {
                window.alert("There was an error. please try again.");
            }

            return isStudent;
            return hasLoggedIn;
        },
        error: function (response) {
            alert("There was a problem. Please check your internet connection and try again.");
        }
    });
}

// Staff login script
function staffLogin() {

    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;

    $.ajax({

        url: "http://localhost:8888/php/staffHandle.php",
        type: "POST",
        data: {
            username: user,
            password: pass
        },
        success: function (response) {
            if (response === "success") {

                // Set local storage to flag user as student
                localStorage.setItem("isStudent", "no");
                // Set local storage to flag user as previously logged in
                localStorage.setItem("hasLoggedIn", "yes");
                $("#but_submit").css("background-color", "darkgrey");
                document.getElementById("but_submit").innerHTML = "Logging in ...";
                setTimeout("location.href = 'app.html';", 1000);
            } else if (response === "incorrect") {
                window.alert("Incorrect login, please try again");
                document.getElementById("forgotPassword").innerHTML = "Forgot Password?";
            } else {
                window.alert("There was an error. please try again.");
            }

        },
        error: function (response) {
            alert("There was a problem. Please check your internet connection and try again.");
        }
    });
}