import * as types from "../constants/ActionTypes";

export const searchTracks = (query, count) => {
    return {
        type: types.SEARCH_TRACKS,
        payload: {
            query: query,
            count: count,
        }
    }
};

export const setSearchTracks = (tracks) => {
    return {
        type: types.SET_SEARCH_TRACKS,
        payload: tracks
    }
};
