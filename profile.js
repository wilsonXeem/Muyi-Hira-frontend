$('document').ready(function () {

    /*****************************
     * Get and Display User Info *
     *****************************/
    let userId = navigator.cookieEnabled ? localStorage.getItem("muyihira-userId") : ""

    let fullname = $('#fullName')
    let fullnme = $('#fullname')
    let Email = $('#Email')
    let Work = $('#Work')
    let About = $('#About')

    $.ajax('http://localhost:8000/profile/details',
        {
            data: JSON.stringify({
                "userId": userId
            }),
            processData: false,
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                console.log(data.user.profileImage.imageUrl);
                fetch(data.user.bannerImage.imageUrl)
                    .then(response => response.blob())
                    .then(blob => document.getElementById('banner-img').src = URL.createObjectURL(blob))
                fetch(data.user.profileImage.imageUrl)
                    .then(response => response.blob())
                    .then(blob => document.getElementById('profile-img').src = URL.createObjectURL(blob))
                fetch(data.user.profileImage.imageUrl)
                    .then(response => response.blob())
                    .then(blob => document.getElementById('profile-imge').src = URL.createObjectURL(blob))
                fullname.html(`<small>${data.user.fullName}</small>`)
                Email.html(`<small>${data.user.details.email}</small>`)
                Work.html(`<small>${data.user.details.occupation}</small>`)
                About.html(`<small>${data.user.details.about}</small>`)
                fullnme.html(`<small>${data.user.fullName}</small>`)
            }
        })


    /***********************************
    * Update user details form Handler *
    ************************************/
    $('#myDetailsform').on('submit', function (event) {
        event.preventDefault()

        let userId = navigator.cookieEnabled ? localStorage.getItem("muyihira-userId") : ""

        let email = $('#email').val()
        let work = $('#work').val()
        let about = $('#about').val()

        $.ajax('http://localhost:8000/profile/details/update',
            {
                data: JSON.stringify({
                    "userId": userId,
                    "email": email,
                    "work": work,
                    "about": about
                }),
                processData: false,
                type: 'PATCH',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data.type);
                    $.ajax('http://localhost:8000/profile/details',
                        {
                            data: JSON.stringify({
                                "userId": userId
                            }),
                            processData: false,
                            type: 'POST',
                            contentType: 'application/json',
                            success: function (data) {
                                $('.modal').modal('hide')
                                console.log(data);
                                Email.html(`<small>${data.user.details.email}</small>`)
                                Work.html(`<small>${data.user.details.occupation}</small>`)
                                About.html(`<small>${data.user.details.about}</small>`)
                            }
                        })
                }
            })
    })
})

/*************************************
 * Update user fullname form Handler *
 *************************************/
$('#my-form').on('submit', function (event) {
    event.preventDefault()

    let userId = navigator.cookieEnabled ? localStorage.getItem("muyihira-userId") : ""

    let firstName = $('#firstName').val()
    let lastName = $('#lastName').val()
    let fullname = $('#fullName')

    $.ajax('http://localhost:8000/profile/details/fullname',
        {
            data: JSON.stringify({
                "userId": userId,
                "firstName": firstName,
                "lastName": lastName
            }),
            processData: false,
            type: 'PATCH',
            contentType: 'application/json',
            success: function (data) {
                console.log(data.type);
                $.ajax('http://localhost:8000/profile/details',
                    {
                        data: JSON.stringify({
                            "userId": userId
                        }),
                        processData: false,
                        type: 'POST',
                        contentType: 'application/json',
                        success: function (data) {
                            $('.modal').modal('hide')
                            console.log(data);
                            fullname.html(`<small>${data.user.fullName}</small>`)
                        }
                    })
            }
        })
})

/********************************
 * Change banner image function *
 * ******************************/ 
$('#profile-form').on('change', function () {
    let userId = navigator.cookieEnabled ? localStorage.getItem("muyihira-userId") : ""
    let formData = new FormData()
    formData.append('section', 'general');
    formData.append('action', 'previewImg');
    formData.append('userId', userId);
    if ($('#change-image').click()) {
        formData.append('type', 'profile');
    } else {
        formData.append('type', 'banner');
    }
    // Attach file
    formData.append('image', $('input[type=file]')[0].files[0]);

    $.ajax({
        url: 'http://localhost:8000/profile/image',
        data: formData,
        type: 'PATCH',
        contentType: false,
        processData: false,
        success: function (data) {
            console.log('success');
            window.location.reload()
        }
    });
})

/********************
* Post form Handler *
*********************/
$('#my-Form').on('submit', function (event) {
    event.preventDefault()

    let userId = navigator.cookieEnabled ? localStorage.getItem("muyihira-userId") : ""

    let content = $('#post').val()
    let privacy = "public"

    $.ajax('http://localhost:8000/user/post',
        {
            data: JSON.stringify({
                "userId": userId,
                "content": content,
                "privacy": privacy
            }),
            processData: false,
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                $('.modal').modal('hide')
                console.log(data.type);
            }
        })
})


/****************************
 * File selection Handlers *
 ****************************/
$('#banner-btn').click(function (event) {
    event.preventDefault()

    $('#select-profile').click()
})

$('#change-image').click(function (event) {
    event.preventDefault()

    $('#select-profile').click()
})

$('#imagebtn').click(function (event) {
    event.preventDefault()

    $('#postbtn').click()
    $('#postImage').click()
})

$('#videobtn').click(function (event) {
    event.preventDefault()

    $('#postbtn').click()
    $('#postVideo').click()
})

$('#postimage').click(function (event) {
    event.preventDefault()

    $('#postImage').click()
})

$('#postvideo').click(function (event) {
    event.preventDefault()

    $('#postVideo').click()
})

$('#addImage').click(function (event) {
    event.preventDefault()

    $('#postImage').click()
})


/*******************************
 * Display selected post image *
 *******************************/
$(function () {
    var imagesPreview = function (input, placeToInsertImagePreview) {
        if (input.files) {
            var filesAmount = input.files.length

            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader()

                reader.onload = function (event) {
                    $($.parseHTML('<img height="60" width="40" style="margin: 5px; border-radius:5px; float:left;">')).attr('src', event.target.result).appendTo(placeToInsertImagePreview)
                }

                reader.readAsDataURL(input.files[i])
            }
        }
    }
    $('#postImage').on('change', function () {
        imagesPreview(this, 'div.imagePreview')
        $('#addImage').css('display', 'flex')
    })
})

$(function () {
    let modal = document.getElementById("myModal");
    let img = $("img")
    let modalImg = document.getElementById("img01");

    img.click(function () {
        modal.style.display = "block";
        modalImg.src = this.src;
    })

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }
})