import {combineReducers} from 'redux';
import TopTracksReducer from './toptracks';
import ArtistReducer from './artist';

export default combineReducers({
    toptracks: TopTracksReducer,
    artist: ArtistReducer,
});
