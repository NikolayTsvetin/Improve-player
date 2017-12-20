import templates from 'templates';
import userController from 'userController';

const $container = $('#container');

class Tracks {
    loadTrackFromSearch(params) {
        const query = params.query;
        const id = params.id;
        const element = document.getElementById(id);
        const title = element.getAttribute('data-title');
        const description = element.getAttribute('data-description');
        const img = element.getAttribute('data-img');
        const data = {
            query,
            id,
            title,
            description,
            img
        };

        return Promise.resolve(templates.loadTemplate('addtrack'))
            .then(template => $container.html(template(data)))
    };

    loadTrackFromPlaylist(params) {
        return Promise.resolve(templates.loadTemplate('removetrack'))
            .then(template => $container.html(template(params)))
    };

    addToPlaylist(params) {
        if (localStorage.getItem('username')) {
            const track = {};
            track.id = params.id;
            const element = document.getElementById(track.id);
            track.title = element.getAttribute('data-title');
            track.description = element.getAttribute('data-description');
            track.img = element.getAttribute('data-img');

            userController.addTrack(track);
        }
        else {
            alertify.error('You need to be logged in, in order to add songs to your playlist');
            return;
        }
    }

    removeFromPlaylist(params) {
        const id = params.id;
        const user = localStorage.getItem('username');
        userController.removeTrack(id);
        setTimeout(() => location.hash = '#/user/' + user + '/playlist', 100);
    }

    showPlaylist() {
        return Promise.all([
            userController.loadPlaylist(),
            templates.loadTemplate('playlist')
        ])
        .then(([tracks, template]) => {
            let fragment = document.createDocumentFragment();
            let div = document.createElement('DIV');
            div.innerHTML = template(tracks);
            div = [...div.children];
            let len = div.length;
            while (div.length > 0) {
                let row = document.createElement('div');
                row.className = 'row';
                let col = div.splice(0, 2);
                row.append(col[0]);
                if (col[1]) {
                    row.append(col[1]);
                }
                len -= 2;
                fragment.append(row);
            }

            $('#container').html(fragment);
        })
    }
}

const tracks = new Tracks();
export default tracks;