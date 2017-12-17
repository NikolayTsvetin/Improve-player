export function checkButtons() {
    if (localStorage.getItem('btn-logout')) {
        $('#btn-login').addClass('hidden');
        $('#btn-register').addClass('hidden');
        $('#btn-logout').removeClass('hidden');
        $('#username-login').addClass('hidden');
        $('#password-login').addClass('hidden');
        $('#profile-link').attr('href', '#/user/' + localStorage.getItem('username') + '/playlist');
        $('#profile-link').text('Hello, ' + localStorage.getItem('username') + ' ');
        $('#profile-link').removeClass('hidden');
    }
}

export function notFound() {
    $.get('templates/404.html', function(data) {
        $('#container').html(data);
    });
}

Handlebars.registerHelper('username', function() {
    const username = localStorage.getItem('username');
    return username;
});

Handlebars.registerHelper('query', function() {
    const query = localStorage.getItem('searchQuery');
    return query;
});

export function validateEmail() {
    const $email = $('#email-value').val();
    const $templateMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
    if ($templateMail.test($email)) {
        $('#email-status').html('<span class="valid">Valid Email address!</span>');
        $('#email-value').removeClass('invalid');
    }
    else {
        $('#email-status').html('<span class="warning">Email address is not valid yet.</span>');
        $('#email-value').addClass('invalid');
    }
}

export function validateUsername() {
    const $username = $('#username-value').val();
    
    if ($username.length < 5) {
        $('#user-status').html('<span class="warning">Username must be 5 symbols or more!</span>');
        $('#username-value').addClass('invalid');
    }
    else {
        $('#user-status').html('<span class="valid">Valid Username!</span>');
        $('#username-value').removeClass('invalid');
    }
}

export function validatePassword() {
    const $pass1 = $('#password-value1').val();
    const $pass2 = $('#password-value2').val(); 
    if ($pass1 !== $pass2) {
        $('#pass-status').html('<span class="warning">Passwords don\'t match!</span>');
        $('#password-value2').addClass('invalid');
    }
    else {
        $('#pass-status').html('<span class="valid">Passwords match!</span>');
        $('#password-value2').removeClass('invalid');
    }
}

export function validateForm() {
    if ($('.invalid').length > 0) {
        $('.invalid').each((i,input) => $(input).css('background-color', 'rgba(255,0,0,0.5)'));
        return;
    }
    else {
        location.hash = '#/signup';
    }
}