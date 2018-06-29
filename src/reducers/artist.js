import * as types from "../constants/ActionTypes";
import {setArtist} from "../actions/artist";
import store from '../store';
import Api from "../utils/Api";

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_ARTIST:
            new Api({
                method: "artist.getinfo",
                mbid: action.payload
            }, response => {
                if (Object.keys(response).indexOf("error") !== -1) {
                    store.dispatch(setArtist({}));
                } else {
                    store.dispatch(setArtist(response.artist));
                }
            });
            return state;
        case types.SET_ARTIST:
            return action.payload;
        default:
            return state;
    }
}