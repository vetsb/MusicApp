import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getTopTracks} from "../actions/toptracks";
import TopTrack from "../components/TopTrack";
import store from '../store';

class Chart extends Component {
    constructor() {
        super();

        this.state = {
            toptracks: {}
        };
    }

    componentDidMount() {
        this.props.getTopTracks(50);

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
                        <h1>Топ Чарт</h1>

                        <div className="toptracks__items _onecolumn">
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
