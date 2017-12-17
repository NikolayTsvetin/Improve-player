import requester from 'requester';

class Data {
/*    login(username, passHash) {
        const body = {
            username,
            passHash
        };

        return requester.putRequest('api/users/auth', body);
    } */

    login(user) {
        const body = user;

        return requester.putRequest('api/users/auth', body)
    }

    register(user) {
        const body = user;
        return requester.postRequest('api/users', body);
    }

    search(searchTerm) {
        const key = 'AIzaSyAJCyNu7i_x0fQP7I6XsM-i33EGu0iH_aY';
        const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + searchTerm + '&type=video&videoCategoryId=10&key=' + key;
        // not sure - to be checked

        return requester.getRequest(url);
    }

    postTrack(headervalue, track) {
        const body = track;
        const header = {
            'x-auth-key': headervalue
        };

        return requester.postRequest('api/tracks', body, header);
    }

    deleteTrack(headervalue, id) {
        const header = {
            'x-auth-key': headervalue
        };

        return requester.removeRequest('api/tracks/' + id, header);
    }

    getTracks(headervalue) {
        const header = {
            'x-auth-key': headervalue
        };

        return requester.getRequest('api/tracks', header);
    }
}

const data = new Data();
export default data;