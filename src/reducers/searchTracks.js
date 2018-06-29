import * as types from "../constants/ActionTypes";
import Api from "../utils/Api";
import {setSearchTracks} from "../actions/searchTracks";
import store from '../store';

export default (state = {}, action) => {
    switch (action.type) {
        case types.SEARCH_TRACKS:
            let options = {
                method: "track.search",
                track: action.payload.query
            };

            if (typeof action.payload.count !== "undefined") {
                options.limit = action.payload.count;
            } else {
                options.limit = 20;
            }

            new Api(options, response => {
                if (Object.keys(response).length === 0 || response.results.trackmatches.track.length === 0) {
                    store.dispatch(setSearchTracks([]));
                } else {
                    response.results.trackmatches.track.forEach((item, key) => {
                        new Api({
                            method: "artist.getInfo",
                            artist: item.artist,
                        }, artistResponse => {
                            response.results.trackmatches.track[key].artistMbid = artistResponse.artist.mbid;

                            if (key === response.results.trackmatches.track.length - 1) {
                                if (Object.keys(response.results.trackmatches.track).length === 0) {
                                    store.dispatch(setSearchTracks([]));
                                } else {
                                    store.dispatch(setSearchTracks(response.results.trackmatches.track));
                                }
                            }
                        });
                    });
                }


            });
            return state;
        case types.SET_SEARCH_TRACKS:
            return action.payload;
        default:
            return state;
    }
}