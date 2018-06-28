import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {getAlbumById} from "../actions/album";
import store from '../store';
import TopTrack from "../components/TopTrack";

class Album extends Component {
    constructor() {
        super();

        this.state = {
            album: {},
            loading: true,
        };
    }

    componentDidMount() {
        this.props.getAlbumById(this.props.match.params.albumId);

        this.unsubscribe = store.subscribe(() => {
            this.setState({
                album: store.getState().album,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="album">
                    <div className="container">
                        <div className="loading">Загрузка...</div>
                    </div>
                </div>
            );
        }

        if (!this.state.loading && Object.keys(this.state.album).length === 0) {
            return (
                <div className="album">
                    <div className="container">
                        <div className="loading">Не найдено</div>
                    </div>
                </div>
            );
        }

        const album = this.state.album;

        return (
            <div className="album">
                <div className="container">
                    <div className="artist__top">
                        <div className="artist__image">
                            <img src={album.image[4]["#text"]} alt=""/>
                        </div>

                        <div className="artist__top_info">
                            <h1>{album.name}</h1>
                            <div className="artist__type">Исполнитель: {album.artist}</div>

                            <div className="artist__tags">
                                {album.tags.tag.map((item, key) => {
                                    const tagLink = "/tag/" + item.name.toLowerCase();

                                    return (
                                        <div className="artist__tag" key={key}>
                                            <Link to={tagLink}>{item.name}</Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="artist__tracks">
                        {album.tracks.track.map((item, key) => {
                            return <TopTrack track={item} key={key} index={key} hideArtist={true} />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getAlbumById: getAlbumById}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Album));