import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getArtist} from "../../actions/artist";

class ArtistInfo extends Component {
    constructor() {
        super();

        this.state = {
            bio: {}
        }
    }

    showFullText = (e) => {
        this.refs.summary.classList.add("artist__text_inner--hide");
        this.refs.full.classList.add("artist__text_inner--show");
        e.target.classList.add("artist__text_show-full--hide");
    };

    render() {
        const bio = this.props.artist.bio;

        return (
            <div className="artist__info">
                <h2>Об исполнителе</h2>

                <div className="artist__text">
                    <div className="artist__text_inner artist__text_inner--summary" ref="summary" dangerouslySetInnerHTML={{__html: bio.summary}}/>
                    <div className="artist__text_inner artist__text_inner--full" ref="full" dangerouslySetInnerHTML={{__html: bio.content}}/>
                    <button onClick={(e) => this.showFullText(e)} className="artist__text_show-full btn btn--black">Читать далее</button>
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
    return bindActionCreators({getArtist: getArtist}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistInfo)
