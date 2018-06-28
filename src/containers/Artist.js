import React, {Component} from 'react';
import {Link, NavLink, Route, Router, withRouter} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import ArtistTracks from "../components/Artist/ArtistTracks";
import ArtistMain from "../components/Artist/ArtistMain";
import bindActionCreators from "redux/src/bindActionCreators";
import {connect} from "react-redux";
import {getArtist} from "../actions/artist";
import store from '../store';
import ArtistAlbums from "../components/Artist/ArtistAlbums";
import ArtistSimilar from "../components/Artist/ArtistSimilar";
import ArtistInfo from "../components/Artist/ArtistInfo";

class Artist extends Component {
    constructor() {
        super();

        this.state = {
            artist: {},
            loading: true,
        };

        this.history = createBrowserHistory();
        this.tabs = [
            {
                title: "Главное",
                link: "",
                component: ArtistMain
            },
            {
                title: "Треки",
                link: "tracks",
                component: ArtistTracks
            },
            {
                title: "Альбомы",
                link: "albums",
                component: ArtistAlbums
            },
            {
                title: "Похожие",
                link: "similar",
                component: ArtistSimilar
            },
            {
                title: "Инфо",
                link: "info",
                component: ArtistInfo
            },
        ];
    }

    componentWillReceiveProps() {
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        this.props.getArtist(this.props.match.params.artist);

        this.unsubscribe = store.subscribe(() => {
            this.setState({
                artist: store.getState().artist,
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
                <div className="artist">
                    <div className="container">
                        <div className="loading">Загрузка...</div>
                    </div>
                </div>
            );
        }

        if (!this.state.loading && Object.keys(this.state.artist).length === 0) {
            return (
                <div className="artist">
                    <div className="container">
                        <div className="loading">Не найдено</div>
                    </div>
                </div>
            );
        }

        const artist = this.state.artist;
        const mainLink = "/music/" + artist.mbid;

        return (
            <div className="artist">
                <div className="container">
                    <div className="artist__top">
                        <div className="artist__image">
                            <img src={artist.image[4]["#text"]} alt=""/>
                        </div>

                        <div className="artist__top_info">
                            <div className="artist__type">Исполнитель</div>
                            <h1>{artist.name}</h1>

                            <div className="artist__tags">
                                {artist.tags.tag.map((item, key) => {
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

                    <Router history={this.props.history}>
                        <div className="artist__tabs">
                            <div className="artist__nav">
                                <ul className="tabs">
                                    {this.tabs.map((item, key) => {
                                        return (
                                            <li key={key}>
                                                <NavLink exact to={mainLink + "/" + item.link}>{item.title}</NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="artist__content">
                                {this.tabs.map((item, key) => {
                                    return (
                                        <Route key={key} exact path={mainLink + "/" + item.link} component={item.component}/>
                                    );
                                })}
                            </div>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tracks: state.toptracks.tracks,
        attr: state.toptracks.attr
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getArtist: getArtist}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Artist));