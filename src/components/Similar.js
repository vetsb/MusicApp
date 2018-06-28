import React, {Component} from 'react';
// import createBrowserHistory from 'history/createBrowserHistory';
import store from '../store';
import {getArtist} from "../actions/artist";
import {Link, withRouter} from "react-router-dom";

class Similar extends Component {
    render() {
        const similar = this.props.item;
        const similarLink = "/music/" + similar.mbid;

        return (
            <div className="similar__item">
                <div className="similar__inner">
                    <Link to={similarLink} onClick={() => {
                        store.dispatch(getArtist(similar.mbid));
                        this.props.history.push(similarLink);
                    }}>
                        <div className="similar__image">
                            <img src={similar.image[3]["#text"]} alt=""/>
                        </div>

                        <h3>{similar.name}</h3>
                    </Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Similar);
