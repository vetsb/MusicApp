import * as types from "../constants/ActionTypes";

export const getArtist = (artistId) => {
    return {
        type: types.GET_ARTIST,
        payload: artistId
    }
};

export const setArtist = (artist) => {
    return {
        type: types.SET_ARTIST,
        payload: artist,
    }
};
