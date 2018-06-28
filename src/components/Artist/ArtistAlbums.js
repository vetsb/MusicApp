import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import store from '../../store';
import {getAlbumsByArtistId} from "../../actions/topalbums";
import TopAlbum from "../TopAlbum";

class ArtistAlbums extends Component {
    constructor() {
        super();

        this.state = {
            albums: []
        }
    }

    componentDidMount() {
        this.props.getAlbumsByArtistId(this.props.artist.mbid, 5);

        this.unsubscribe = store.subscribe(() => {
            if (Object.keys(store.getState().topalbums.albums).length > 0) {
                this.setState({
                    albums: store.getState().topalbums.albums
                })
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (Object.keys(this.state.albums).length === 0) {
            return (
                <div className="main">
                    <h2>Альбомы</h2>
                    <div className="loading">Загрузка...</div>
                </div>
            );
        }

        return (
            <div className="albums">
                <h2>Альбомы</h2>
                <div className="albums__items">
                    {this.state.albums.map((item, key) => {
                        return <TopAlbum album={item} key={key}/>
                    })}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        artist: state.artist
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getAlbumsByArtistId: getAlbumsByArtistId}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistAlbums)
