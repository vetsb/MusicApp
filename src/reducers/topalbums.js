import * as types from "../constants/ActionTypes";
import store from '../store';
import Api from "../Api";
import {setAlbumsByArtistId} from "../actions/topalbums";

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_ALBUMS_BY_ARTIST_ID:
            let query = {
                method: "artist.getTopAlbums",
                page: 1,
                mbid: action.payload.id
            };

            new Api(query, response => {
                let indexes = [];

                response.topalbums.album.forEach((item, key) => {
                    if (typeof item.mbid === "undefined") {
                        indexes.push(key);
                    }
                });

                for (let i = indexes.length-1; i >= 0; i--) {
                    response.topalbums.album.splice(indexes[i], 1);
                }

                store.dispatch(setAlbumsByArtistId(response.topalbums.album, response.topalbums["@attr"]));
            });

            return state;
        case types.SET_ALBUMS_BY_ARTIST_ID:
            return action.payload;

        default:
            return state;
    }

}