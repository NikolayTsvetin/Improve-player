class Requester {
    request(url, type, body, headers) {
        const promise = new Promise((resolve, reject) => $.ajax({
            url,
            type,
            contentType: 'application/json',
            headers,
            data: body,
            success: resolve,
            error: reject
        }));

        return promise;
    }

    getRequest(url, headers = {}) {
        return this.request(url, 'GET', '', headers);
    }

    postRequest(url, body, headers) {
        return this.request(url, 'POST', JSON.stringify(body), headers);
    }

    putRequest(url, body, headers) {
        return this.request(url, 'PUT', JSON.stringify(body), headers);
    }

    removeRequest(url, headers) {
        return this.request(url, 'PUT', '', headers);
    }
}

let requester = new Requester();
export default requester;