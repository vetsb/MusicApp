import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTracksByArtistId} from "../../actions/toptracks";
import store from '../../store';

class ArtistMain extends Component {
    constructor() {
        super();

        this.state = {
            tracks: []
        }
    }

    componentDidMount() {
        this.props.getTracksByArtistId(this.props.artist.mbid);

        this.unsubscribe = store.subscribe(() => {
            if (Object.keys(store.getState().toptracks.tracks).length > 0) {
                this.setState({
                    tracks: store.getState().toptracks.tracks,
                })
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return this.state.tracks.map((item, key) => {
            return (
                <div key={key}>{item.name}</div>
            )
        });
    }
}

function mapStateToProps(state) {
    return {
        artist: state.artist
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getTracksByArtistId: getTracksByArtistId}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistMain)
