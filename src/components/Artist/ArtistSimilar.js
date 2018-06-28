import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import store from '../../store';
import {getSimilarByArtistId} from "../../actions/similar";
import Similar from "../Similar";

class ArtistSimilar extends Component {
    constructor() {
        super();

        this.state = {
            similar: []
        }
    }

    componentDidMount() {
        this.props.getSimilarByArtistId(this.props.artist.mbid, 9);

        this.unsubscribe = store.subscribe(() => {
            if (Object.keys(store.getState().similar.items).length > 0) {
                this.setState({
                    similar: store.getState().similar.items,
                })
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (Object.keys(this.state.similar).length === 0) {
            return (
                <div className="similar">
                    <h2>Похожие исполнители</h2>
                    <div className="loading">Загрузка...</div>
                </div>
            );
        }

        return (
            <div className="similar">
                <h2>Похожие исполнители</h2>
                <div className="similar__items">
                    {this.state.similar.map((item, key) => {
                        return (
                            <Similar item={item} key={key}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        artist: state.artist
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getSimilarByArtistId: getSimilarByArtistId}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistSimilar)
