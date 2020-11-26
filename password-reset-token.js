$('document').ready(function () {
    let message = $('#message')

    $.ajax(`http://localhost:8000/auth/password-reset/:resetToken`,
        {
            processData: false,
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {

                console.log(data.type)

                if (data.type === "message") {
                    message.css("display", "block")
                    message.html(`${data.error}<br> 
                    Click <a href="password-reset.html" style= "color: red;">here</a> to resend mail`)
                }
            }
        })

    $('form').submit(function (event) {
        event.preventDefault()

        $("input").focus(function () {
            passwordp.css("display", "none")
            $('#password').css("margin-bottom", "8px")
        })

        let password = $('#password').val()
        let passwordp = $('#passwordp')

        $.ajax('http://localhost:8000/auth/password-reset/new',
            {
                data: JSON.stringify({
                    "password": password
                }),
                processData: false,
                type: 'PATCH',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data.type)
                    if (data.type === "password") {
                        $('#password').css("margin-bottom", "0px")
                        passwordp.css("display", "block")
                        passwordp.html(`<small>${data.error}</small>`)
                    }

                    if (data.type === "message") {
                        message.css("display", "block")
                        message.html(`${data.message}`)
                    }
                }
            })
    })
})