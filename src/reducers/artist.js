import {GET_ARTIST, SET_ARTIST} from "../constants/ActionTypes";
import {setArtist} from "../actions/artist";
import store from '../store';
import Api from "../Api";

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ARTIST:
            new Api({
                method: "artist.getinfo",
                mbid: action.payload
            }, response => {
                store.dispatch(setArtist(response.artist));
            });
            return state;
        case SET_ARTIST:
            return action.payload;
        default:
            return state;
    }
}