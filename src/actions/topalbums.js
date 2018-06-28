import * as types from "../constants/ActionTypes";

export const getAlbumsByArtistId = (id, count) => {
    return {
        type: types.GET_ALBUMS_BY_ARTIST_ID,
        payload: {
            id: id,
            count: count
        }
    }
};


export const setAlbumsByArtistId = (albums, attr) => {
    return {
        type: types.SET_ALBUMS_BY_ARTIST_ID,
        payload: {
            albums: albums,
            attr: attr
        }
    }
};
