// MODULE SEARCH AUTO-COMPLETE

function fill(Value) {
    //Assigning value to "search" div in "search.php" file.
    $('#search').val(Value);
    //Hiding "display" div in "search.php" file.
    $('#display').hide();
}
$(document).ready(function () {
    //On pressing a key on "Search box" in "search.php" file. This function will be called.
    $("#search").keyup(function () {
        //Assigning search box value to javascript variable named as "name".
        var name = $('#search').val();
        //Validating, if "name" is empty.
        if (name == "") {
            //Assigning empty value to "display" div in "search.php" file.
            $("#display").html("");
        }
        //If name is not empty.
        else {
            //AJAX is called.
            $.ajax({
                //AJAX type is "Post".
                type: "POST",
                //Data will be sent to "ajax.php".
                url: "http://localhost:8888/php/get-modules.php",
                //Data, that will be sent to "ajax.php".
                data: {
                    //Assigning value of "name" into "search" variable.
                    search: name
                },
                //If result found, this funtion will be called.
                success: function (html) {
                    //Assigning result to "display" div in "search.php" file.
                    $("#display").html(html).show();
                }
            });
        }
    });
});


  // MODULE SEARCH
    function loadModulePage() {
        var name = $('#search').val();
        $.ajax({

            url: "http://localhost:8888/php/module-info.php",
            type: "POST",
            data: {
                search: name
            },
            success: function(response) {
                document.getElementById("ModuleInfo").innerHTML = response;
                document.getElementById("modulePageHeader").innerHTML = $('#search').val();


            }
        });
    }
    
    
    // LECTURER SEARCH
    function loadLecturerPage() {
        var name = $('#lecturerSearch').val();
        $.ajax({

            url: "http://localhost:8888/php/lecturer-info.php",
            type: "POST",
            data: {
            search: name
            },
            success: function(response) {
                document.getElementById("LecturerInfo").innerHTML = response;
                document.getElementById("LecturerPageHeader").innerHTML = name;
                console.log("success");


            }
        });
    }
    
    
// STUDENT SEARCH
    function loadStudentPage() {
        var name = $('#studentSearch').val();
        $.ajax({

            url: "http://localhost:8888/php/student-info.php",
            type: "POST",
            data: {
                studentSearch: name
            },
            success: function(response) {
                document.getElementById("StudentInfo").innerHTML = response;
                document.getElementById("StudentPageHeader").innerHTML = $('#studentSearch').val();


            }
        });
    }