import templates from 'templates';
import data from 'data';

const $container = $('#container');

class Search {
    searchTracks(params) {
        const searchTerm = $('#search-field').val();
        localStorage.setItem('searchQuery', searchTerm);
        Promise.all([
            data.search(searchTerm),
            templates.loadTemplate('search')
        ])
        .then(([items, template]) => {
            $container.html(template(items));
        });
    }
}

const search = new Search();
export default search;