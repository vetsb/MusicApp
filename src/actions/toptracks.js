import * as types from "../constants/ActionTypes";

export const getTopTracks = (count) => {
    return {
        type: types.GET_TOP_TRACKS,
        payload: {
            count: count
        }
    }
};

export const setTopTracks = (tracks, attr) => {
    return {
        type: types.SET_TOP_TRACKS,
        payload: {
            tracks: tracks,
            attr: attr
        }
    }
};

export const getTracksByArtistId = (id) => {
    return {
        type: types.GET_TRACKS_BY_ARTIST_ID,
        payload: {
            id: id
        }
    }
};


export const setTracksByArtistId = (tracks, attr) => {
    return {
        type: types.SET_TRACKS_BY_ARTIST_ID,
        payload: {
            tracks: tracks,
            attr: attr
        }
    }
};
