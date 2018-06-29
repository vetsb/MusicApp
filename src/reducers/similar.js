import * as types from "../constants/ActionTypes";
import store from '../store';
import Api from "../utils/Api";
import {setSimilarByArtistId} from "../actions/similar";

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_SIMILAR_BY_ARTIST_ID:
            let query = {
                method: "artist.getSimilar",
                page: 1,
                mbid: action.payload.id,
                limit: action.payload.count
            };

            new Api(query, response => {
                store.dispatch(setSimilarByArtistId(response.similarartists.artist, response.similarartists["@attr"]));
            });

            return state;
        case types.SET_SIMILAR_BY_ARTIST_ID:
            return action.payload;

        default:
            return state;
    }

}