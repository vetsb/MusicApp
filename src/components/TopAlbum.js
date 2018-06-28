import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";

class TopAlbum extends Component {
    render() {
        const album = this.props.album;
        const albumLink = "/album/" + album.mbid;

        return (
            <div className="albums__item">
                <div className="albums__inner">
                    <Link to={albumLink}>
                        <div className="albums__image">
                            <img src={album.image[3]["#text"]} alt=""/>
                        </div>

                        <h3>{album.name}</h3>
                    </Link>
                </div>
            </div>
        );
    }
}

export default withRouter(TopAlbum);
