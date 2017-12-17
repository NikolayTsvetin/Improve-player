class HomeController {
    showHome() {
        $('#search-field').val('');
        $('#container').html('');
        $('#username-login').val('');
        $('#password-login').val('');
    }
}

const homeController = new HomeController();
export default homeController;