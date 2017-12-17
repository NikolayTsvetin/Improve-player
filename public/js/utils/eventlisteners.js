import 'jquery';
import * as helpers from 'helpers';
import router from '../app/app.js';

$('body').on('blur', '#email-value', (e) => helpers.validateEmail());
$('body').on('blur', '#username-value', (e) => helpers.validateUsername());
$('body').on('keyup', '#password-value2', (e) => helpers.validatePassword());
$('body').on('click', '#btn-signup', () => helpers.validateForm());
$('body').on('focus', '.invalid', (e) => $(e.target).css('background-color', 'rgb(255,255,255)'));

$('body').on('click', '#search-btn', () => {
    let query = $('#search-field').val();

    if (query === '') {
        return;
    }
    else {
        router.navigate('search/' + query).resolve();
    }
});

$('body').on('keypress', '#search-field', (e) => {
    if (e.keyCode === 13) {
        let query = $('#search-field').val();

        if (query === '') {
            return;
        }
        else {
            router.navigate('search/' + query)
         /*   router
            .on('search/:query', function(params) {
                alert('router detected in event listener');
                searchController.searchTracks(params);
            }) */
            .resolve();
        }
    }
})

$(document).ready(helpers.checkButtons());