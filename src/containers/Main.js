import React, { Component } from 'react';
import Link from "react-router-dom/es/Link";
import store from '../store';
import {bindActionCreators} from "redux";
import {getTopTracks} from "../actions/toptracks";
import {connect} from "react-redux";

class Main extends Component {
    constructor() {
        super();

        this.state = {
            toptracks: {}
        };
    }

    componentDidMount() {
        this.props.getTopTracks();

        this.unsubscribe = store.subscribe(() => {
            if (Object.keys(store.getState().toptracks.tracks).length > 0) {
                this.setState({
                    toptracks: store.getState().toptracks,
                })
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (Object.keys(this.state.toptracks).length === 0) {
            return (
                <div className="main">
                    <div className="container">
                        <div className="loading">Загрузка...</div>
                    </div>
                </div>
            );
        }

        return (
            <div className="main">
                <div className="container">
                    <div className="toptracks">
                        <div className="toptracks__top">
                            <Link to="/chart">
                                <div className="toptracks__top_left">
                                    <h2>Топ Чарт</h2>
                                    <p>Треки, популярные на сайте прямо сейчас</p>
                                </div>
                                <div className="toptracks__top_link">Смотреть всё</div>
                            </Link>
                        </div>

                        <div className="toptracks__items">
                            {this.state.toptracks.tracks.map((item, key) => {
                                let imageUrl = "";

                                item.image.forEach((imageItem) => {
                                    if (imageItem.size === "medium") {
                                        imageUrl = imageItem["#text"];
                                    }
                                });

                                const artistLink = "/music/" + item.artist.mbid;
                                const nameLink = artistLink + "/" + item.name;

                                return (
                                    <div className="toptracks__item" key={key}>
                                        <div className="toptracks__inner">
                                            <div className="toptracks__number">{key+1}</div>
                                            <div className="toptracks__image">
                                                <img src={imageUrl} alt=""/>
                                            </div>
                                            <div className="toptracks__info">
                                                <div className="toptracks__name"><Link to={nameLink}>{item.name}</Link></div>
                                                <div className="toptracks__artist"><Link to={artistLink}>{item.artist.name}</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
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
    return bindActionCreators({getTopTracks: getTopTracks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
