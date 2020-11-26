/**********************
 * Login form Handler *
 **********************/ 
$('.login-form').submit(function (event) {
    event.preventDefault()

    let Email = $('#emailLog').val()
    let Password = $('#passwordLog').val()

    $.ajax('http://localhost:8000/auth/login',
        {
            data: JSON.stringify({
                "email": Email,
                "password": Password
            }),
            processData: false,
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                localStorage.setItem("muyihira-userId", `${data.userId}`)
                console.log(data.type)
                if (data.type !== "email" && data.type !== "password") {
                    $('.login-form').unbind('submit').submit()
                } else {
                    
                    alert(data.error)
                }
            }
        })

})

/**********************
 * Close form modal *
 **********************/ 
function closeForm() {
    $('.modal').modal('hide')
}

/**********************
 * Sign up form Handler *
 **********************/ 
$('#myform').submit(function (event) {
    event.preventDefault()

    $("input").focus(function () {
        emailp.css("display", "none")
        $('#email').css("margin-bottom", "8px")
        firstNamep.css("display", "none")
        $('#firstName').css("margin-bottom", "8px")
        lastNamep.css("display", "none")
        $('#lastName').css("margin-bottom", "8px")
        dobp.css("display", "none")
        $('#dob').css("margin-bottom", "8px")
        passwordp.css("display", "none")
        $('#password').css("margin-bottom", "8px")
        genderp.css("display", "none")
        $('.inp1').css("margin-bottom", "15px")
    })

    let email = $('#email').val()
    let firstName = $('#firstName').val()
    let lastName = $('#lastName').val()
    let dob = $('#dob').val()
    let password = $('#password').val()
    let gender;
    let inp = document.querySelectorAll(".inp1")
    for (let i of inp) {
        if (i.checked) {
            gender = i.value
        }
    }

    let emailp = $('#emailp')
    let firstNamep = $('#firstNamep')
    let lastNamep = $('#lastNamep')
    let dobp = $('#dobp')
    let passwordp = $('#passwordp')
    let genderp = $('#genderp')

    $.ajax('http://localhost:8000/auth/signup',
        {
            data: JSON.stringify({
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "gender": gender,
                "dob": dob,
                "password": password
            }),
            processData: false,
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                console.log(data.type);
                if (data.type === "email") {
                    $('#email').css("margin-bottom", "0px")
                    emailp.css("display", "block")
                    emailp.html(`<small>${data.error}</small>`)
                }

                if (data.type === "firstName") {
                    $('#firstName').css("margin-bottom", "0px")
                    firstNamep.css("display", "block")
                    firstNamep.html(`<small>${data.error}</small>`)
                }

                if (data.type === "lastName") {
                    $('#lastName').css("margin-bottom", "0px")
                    lastNamep.css("display", "block")
                    lastNamep.html(`<small>${data.error}</small>`)
                }

                if (data.type === "dob") {
                    $('#dob').css("margin-bottom", "0px")
                    dobp.css("display", "block")
                    dobp.html(`<small>${data.error}</small>`)
                }

                if (data.type === "password") {
                    $('#password').css("margin-bottom", "0px")
                    passwordp.css("display", "block")
                    passwordp.html(`<small>${data.error}</small>`)
                }

                if (data.type === "gender") {
                    $('.inp1').css("margin-bottom", "0px")
                    genderp.css("display", "block")
                    genderp.html(`<small>${data.error}</small>`)
                }
                if (data.type === "user") {
                    localStorage.setItem("muyihira-userId", `${data.createUser.id}`)
                    $('#myform').unbind('submit').submit()
                }
            }
        })
})

