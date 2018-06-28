import React, { Component } from 'react';
import {Link} from "react-router-dom";

class TopTrack extends Component {
    render() {
        const artistLink = "/music/" + this.props.track.artist.mbid;

        return (
            <div className="toptracks__item" key={this.props.index}>
                <div className="toptracks__inner">
                    <div className="toptracks__number">{this.props.index+1}</div>
                    {(typeof this.props.hideArtist === "undefined" || !this.props.hideArtist) ? (
                        <div className="toptracks__image">
                            <img src={this.props.track.image[1]["#text"]} alt=""/>
                        </div>
                    ) : null}

                    <div className="toptracks__info">
                        <div className="toptracks__name">{this.props.track.name}</div>
                        {(typeof this.props.hideArtist === "undefined" || !this.props.hideArtist) ? (
                            <div className="toptracks__artist"><Link to={artistLink}>{this.props.track.artist.name}</Link></div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default TopTrack;
