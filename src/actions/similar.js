import * as types from "../constants/ActionTypes";

export const getSimilarByArtistId = (id, count) => {
    return {
        type: types.GET_SIMILAR_BY_ARTIST_ID,
        payload: {
            id: id,
            count: count
        }
    }
};


export const setSimilarByArtistId = (similar, attr) => {
    return {
        type: types.SET_SIMILAR_BY_ARTIST_ID,
        payload: {
            items: similar,
            attr: attr
        }
    }
};
