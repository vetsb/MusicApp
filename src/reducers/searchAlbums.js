import * as types from "../constants/ActionTypes";
import Api from "../utils/Api";
import store from '../store';
import {setSearchAlbums} from "../actions/searchAlbums";

export default (state = {}, action) => {
    switch (action.type) {
        case types.SEARCH_ALBUMS:
            let options = {
                method: "album.search",
                album: action.payload.query,
            };

            if (typeof action.payload.count !== "undefined") {
                options.limit = action.payload.count;
            } else {
                options.limit = 20;
            }

            new Api(options, response => {
                if (Object.keys(response).length === 0 || response.results.albummatches.album.length === 0) {
                    store.dispatch(setSearchAlbums([]));
                } else {
                    response.results.albummatches.album.forEach((item, key) => {
                        new Api({
                            method: "artist.getInfo",
                            artist: item.artist,
                        }, artistResponse => {
                            response.results.albummatches.album[key].artistMbid = artistResponse.artist.mbid;

                            if (key === response.results.albummatches.album.length - 1) {
                                store.dispatch(setSearchAlbums(response.results.albummatches.album));
                            }
                        });
                    });
                }


            });
            return state;
        case types.SET_SEARCH_ALBUMS:
            return action.payload;
        default:
            return state;
    }
}