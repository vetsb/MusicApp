import * as types from "../constants/ActionTypes";

export const searchArtists = (query, count) => {
    return {
        type: types.SEARCH_ARTISTS,
        payload: {
            query: query,
            count: count,
        }
    }
};

export const setSearchArtists = (artists) => {
    return {
        type: types.SET_SEARCH_ARTISTS,
        payload: artists
    }
};
