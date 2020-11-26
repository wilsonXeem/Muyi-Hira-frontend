$('#reset-form').submit(function (event) {
    event.preventDefault()

    $("input").focus(function () {
        emailp.css("display", "none")
        $('#email-reset').css("margin-bottom", "8px")
    })

    let email = $('#email-reset').val().toLowerCase()
    let emailpg = $('#emailp')
    let message = $('#message')

    $.ajax('http://localhost:8000/auth/password-reset',
        {
            data: JSON.stringify({
                "email": email
            }),
            processData: false,
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                console.log(data.type)
                if (data.type === "email") {
                    $('#email').css("margin-bottom", "0px")
                    emailpg.css("display", "block")
                    emailpg.html(`<small>${data.error}</small>`)
                }
                if (data.type === "message") {
                    check(data.message)
                }
            }
        })
    function check(messagey) {
            $('#reset-form').css("display", "none")
            message.css("display", "block")
            message.html(`${messagey}`)
            $('.modal-footer').css("display", "block")
    }
})