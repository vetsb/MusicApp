import * as types from "../constants/ActionTypes";
import store from '../store';
import {setTopTracks, setTracksByArtistId} from "../actions/toptracks";
import Api from "../Api";

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_TOP_TRACKS:
            let count = action.payload.count;

            if (typeof count === "undefined") {
                count = 10;
            }

            new Api({
                method: "chart.gettoptracks",
                page: 1,
                limit: count
            }, response => {
                store.dispatch(setTopTracks(response.tracks.track, response.tracks["@attr"]));
            });
            return state;
        case types.SET_TOP_TRACKS:
            return action.payload;

        case types.GET_TRACKS_BY_ARTIST_ID:
            let query = {
                method: "artist.getTopTracks",
                page: 1,
                mbid: action.payload.id,
                limit: action.payload.count
            };

            new Api(query, response => {
                store.dispatch(setTracksByArtistId(response.toptracks.track, response.toptracks["@attr"]));
            });

            return state;
        case types.SET_TRACKS_BY_ARTIST_ID:
            return action.payload;

        default:
            return state;
    }

}