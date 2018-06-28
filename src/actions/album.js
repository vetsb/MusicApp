import * as types from "../constants/ActionTypes";

export const getAlbumById = (id) => {
    return {
        type: types.GET_ALBUM_BY_ID,
        payload: id
    }
};

export const setAlbumById = (album) => {
    return {
        type: types.SET_ALBUM_BY_ID,
        payload: album,
    }
};
