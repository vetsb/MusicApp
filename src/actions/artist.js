import {GET_ARTIST, SET_ARTIST} from "../constants/ActionTypes";

export const getArtist = (artistId) => {
    return {
        type: GET_ARTIST,
        payload: artistId
    }
};

export const setArtist = (artist) => {
    return {
        type: SET_ARTIST,
        payload: artist,
    }
};
