import data from 'data';
import encryptor from 'encryptor';

class UserController {
    login() {
        const username = $('#username-login').val();
        const password = $('#password-login').val();
        const passHash = encryptor.encrypt(password);

        if (!username || !password) {
            alert('Please enter username and password');
            location.hash = '#/home';
            return;
        }

        const user = {
            username,
            passHash
        };

        data.login(user)
            .then((result) => {
                console.log(result);
                localStorage.setItem('authKey', result.result.authKey);
                localStorage.setItem('btn-logout', 'true');
                localStorage.setItem('username', result.result.username);
                $('#btn-login').addClass('hidden');
                $('#btn-register').addClass('hidden');
                $('#btn-logout').removeClass('hidden');
                $('#username-login').addClass('hidden');
                $('#password-login').addClass('hidden');
                $('#profile-link').attr('href', '#/user/' + result.result.username + '/playlist');
                $('#profile-link').text('Hello, ' + result.result.username);
                $('#profile-link').removeClass('hidden');
                location.hash = '#/home';
                alert('User logged successfully');
            });
    }

    showRegisterForm() {
        $.get('/templates/registration.html', function(data) {
            $('#form-background').html(data);
        });

        $('#form-background').css("display", "block");
    }

    hideRegisterForm() {
        $('#form-background').css("display", "none");
        $('#form-background').html('');
        location.hash = "#/home";
    }

    signUp() {
        const email = $("#email-value").val();
        const username = $("#username-value").val()
        const password = $("#password-value2").val();
        const passHash = encryptor.encrypt(password);
        const user = {
            email,
            username,
            passHash
        };

        this.hideRegisterForm();

        data.register(user)
            .then(result => {
                location.hash = '#/home';
                alert('You are registered');
            });
    }

    logout() {
        localStorage.clear();
        $('#btn-login').removeClass('hidden');
        $('#btn-register').removeClass('hidden');
        $('#btn-logout').addClass('hidden');
        $('#username-login').removeClass('hidden');
        $('#password-login').removeClass('hidden');
        $('#profile-link').text('');
        $('#profile-link').addClass('hidden');
        alert('Successfully logged out, but why?//if you\'re reading this means that big changes are coming soon.');
        location.hash = '#/home';
    }

    addTrack(track) {
        const headervalue = localStorage.getItem('authKey');

        data.postTrack(headervalue, track)
            .then(result => {
                console.log('Post Track' + result);
                alert('Track posted? //if you\'re reading this means that big changes are coming soon.');
            });
    }

    removeTrack(id) {
        const headervalue = localStorage.getItem('authKey');

        data.deleteTrack(headervalue, id)
            .then(result => {
                console.log('Delete track' + result);
                alert('Track removed? //if you\'re reading this means that big changes are coming soon.');
            });
    }

    loadPlaylist() {
        const headervalue = localStorage.getItem('authKey');

        return Promise.resolve(data.getTracks(headervalue));
    }
}

const userController = new UserController();
export default userController;