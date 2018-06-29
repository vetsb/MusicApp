export default class Api {
    constructor(options, callback) {
        this._options = {
            format: "json",
            api_key: "4db31c2da6da643ed02bce6da1c744b3",
        };
        Object.assign(this._options, options);



        let url = "http://ws.audioscrobbler.com/2.0/?";
        let index = 0;

        for (let key in this._options) {
            url += (url === "" || index === 0) ? "" : "&";
            url += key + "=" + encodeURIComponent(this._options[key]);

            index++;
        }

        fetch(url)
            .then(response => response.json())
            .then(response => callback(response));
    }
}