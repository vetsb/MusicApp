import * as types from "../constants/ActionTypes";
import store from '../store';
import Api from "../Api";
import {setArtistsByTag, setTracksByTag} from "../actions/tag";

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_ARTISTS_BY_TAG:
            new Api({
                method: "tag.getTopArtists",
                tag: action.payload
            }, response => {
                store.dispatch(setArtistsByTag(response.topartists.artist, response.topartists.attr));
            });
            return state;
        case types.SET_ARTISTS_BY_TAG:
            return action.payload;

        case types.GET_TRACKS_BY_TAG:
            new Api({
                method: "tag.getTopTracks",
                tag: action.payload
            }, response => {
                store.dispatch(setTracksByTag(response.tracks.track, response.tracks.attr));
            });
            return state;
        case types.SET_TRACKS_BY_TAG:
            return action.payload;

        default:
            return state;
    }
}