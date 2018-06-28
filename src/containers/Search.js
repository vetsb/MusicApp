import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {NavLink, Route, Router, withRouter} from "react-router-dom";
import {getAlbumById} from "../actions/album";
import store from '../store';
import SearchTracks from '../components/Search/SearchTracks';

class Search extends Component {
    constructor() {
        super();

        this.tabs = [
            {
                title: "Треки",
                link: "",
                component: SearchTracks
            },
            {
                title: "Исполнители",
                link: "/artists",
                component: SearchTracks
            },
            {
                title: "Альбомы",
                link: "/albums",
                component: SearchTracks
            },
        ];
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
        return (
            <div className="search">
                <div className="container">
                    <h1>Поиск</h1>

                    <Router history={this.props.history}>
                        <div className="artist__tabs">
                            <div className="artist__nav">
                                <ul className="tabs">
                                    {this.tabs.map((item, key) => {
                                        return (
                                            <li key={key}>
                                                <NavLink exact to={{
                                                    pathname: "/search" + item.link,
                                                    search: this.props.location.search
                                                }}>{item.title}</NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="artist__content">
                                {this.tabs.map((item, key) => {
                                    return (
                                        <Route key={key} exact path={"/search" + item.link} component={item.component}/>
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
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getAlbumById: getAlbumById}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));