import * as types from "../constants/ActionTypes";
import store from '../store';
import Api from "../utils/Api";
import {setAlbumById} from "../actions/album";

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_ALBUM_BY_ID:
            new Api({
                method: "album.getInfo",
                mbid: action.payload
            }, response => {
                if (Object.keys(response).indexOf("error") !== -1) {
                    store.dispatch(setAlbumById({}));
                } else {
                    store.dispatch(setAlbumById(response.album));
                }
            });
            return state;
        case types.SET_ALBUM_BY_ID:
            return action.payload;
        default:
            return state;
    }
}