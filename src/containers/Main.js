import React, { Component } from 'react';
import Link from "react-router-dom/es/Link";
import store from '../store';
import {bindActionCreators} from "redux";
import {getTopTracks} from "../actions/toptracks";
import {connect} from "react-redux";
import TopTrack from "../components/TopTrack";

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
                                    <h1>Топ Чарт</h1>
                                    <p>Треки, популярные на сайте прямо сейчас</p>
                                </div>
                                <div className="toptracks__top_link">Смотреть всё</div>
                            </Link>
                        </div>

                        <div className="toptracks__items">
                            {this.state.toptracks.tracks.map((item, key) => {
                                return <TopTrack track={item} key={key} index={key}/>
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
