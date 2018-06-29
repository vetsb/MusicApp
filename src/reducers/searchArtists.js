import * as types from "../constants/ActionTypes";
import Api from "../utils/Api";
import store from '../store';
import {setSearchArtists} from "../actions/searchArtists";

export default (state = {}, action) => {
    switch (action.type) {
        case types.SEARCH_ARTISTS:
            let options = {
                method: "artist.search",
                artist: action.payload.query
            };

            if (typeof action.payload.count !== "undefined") {
                options.limit = action.payload.count;
            } else {
                options.limit = 20;
            }

            new Api(options, response => {
                if (Object.keys(response).length === 0 || response.results.artistmatches.artist.length === 0) {
                    store.dispatch(setSearchArtists([]));
                } else {
                    store.dispatch(setSearchArtists(response.results.artistmatches.artist));
                }
            });
            return state;
        case types.SET_SEARCH_ARTISTS:
            return action.payload;
        default:
            return state;
    }
}