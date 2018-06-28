import {combineReducers} from 'redux';
import TopTracksReducer from './toptracks';
import TopAlbumsReducer from './topalbums';
import AlbumReducer from './album';
import SimilarReducer from './similar';
import ArtistReducer from './artist';
import TagReducer from './tag'
import SearchTracksReducer from './searchTracks';
import SearchArtistsReducer from './searchArtists';
import SearchAlbumsReducer from './searchAlbums';

export default combineReducers({
    toptracks: TopTracksReducer,
    topalbums: TopAlbumsReducer,
    album: AlbumReducer,
    similar: SimilarReducer,
    tag: TagReducer,
    artist: ArtistReducer,
    searchTracks: SearchTracksReducer,
    searchArtists: SearchArtistsReducer,
    searchAlbums: SearchAlbumsReducer,
});
