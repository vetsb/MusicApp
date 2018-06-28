import * as types from "../constants/ActionTypes";

export const getArtistsByTag = (tag) => {
    return {
        type: types.GET_ARTISTS_BY_TAG,
        payload: tag
    }
};

export const getTracksByTag = (tag) => {
    return {
        type: types.GET_TRACKS_BY_TAG,
        payload: tag,
    }
};


export const setArtistsByTag = (artists, attr) => {
    return {
        type: types.SET_ARTISTS_BY_TAG,
        payload: {
            items: artists,
            attr: attr,
        }
    }
};

export const setTracksByTag = (tracks, attr) => {
    return {
        type: types.SET_TRACKS_BY_TAG,
        payload: {
            items: tracks,
            attr: attr
        }
    }
};
