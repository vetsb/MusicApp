import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getTracksByTag} from "../../actions/tag";
import store from '../../store';
import TopTrack from "../TopTrack";

class TagTracks extends Component {
    constructor() {
        super();

        this.state = {
            tracks: [],
            loading: true
        };
    }

    componentDidMount() {
        this.props.getTracksByTag(this.props.tag);

        this.unsubscribe = store.subscribe(() => {
            this.setState({
                tracks: store.getState().tag.items,
                loading: false
            })
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="main">
                    <div className="loading">Загрузка...</div>
                </div>
            );
        }

        if (!this.state.loading && Object.keys(this.state.tracks).length === 0) {
            return (
                <div className="main">
                    <div className="loading">Не найдено</div>
                </div>
            );
        }

        return (
            <div className="toptracks__items">
                {this.state.tracks.map((item, key) => {
                    return (
                        <TopTrack track={item} key={key} index={key}/>
                    )
                })}
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getTracksByTag: getTracksByTag}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TagTracks)