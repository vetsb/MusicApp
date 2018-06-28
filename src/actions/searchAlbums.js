import * as types from "../constants/ActionTypes";

export const searchAlbums = (query, count) => {
    return {
        type: types.SEARCH_ALBUMS,
        payload: {
            query: query,
            count: count,
        }
    }
};

export const setSearchAlbums = (albums) => {
    return {
        type: types.SET_SEARCH_ALBUMS,
        payload: albums
    }
};
