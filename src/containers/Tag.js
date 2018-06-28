import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getArtistsByTag, getTracksByTag} from "../actions/tag";
import TagArtists from "../components/Tag/TagArtists";
import {NavLink, Route, Router, withRouter} from "react-router-dom";
import TagTracks from "../components/Tag/TagTracks";

class Tag extends Component {
    constructor() {
        super();

        this.state = {
            artists: [],
            tracks: []
        };
    }

    render() {
        this.tabs = [
            {
                title: "Исполнители",
                link: "",
            },
            {
                title: "Треки",
                link: "tracks",
            },
        ];

        const mainLink = "/tag/" + this.props.match.params.tag;

        return (
            <div className="tag">
                <div className="container">
                    <h1>Поиск по тэгу {this.props.match.params.tag}</h1>

                    <Router history={this.props.history}>
                        <div className="tag__tabs">
                            <div className="tag__nav">
                                <ul className="tabs">
                                    {this.tabs.map((item, key) => {
                                        return (
                                            <li key={key}>
                                                <NavLink exact to={mainLink + "/" + item.link}>{item.title}</NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="tag__content">
                                <Route exact path={mainLink + "/"} render={() => <TagArtists tag={this.props.match.params.tag} />}/>
                                <Route exact path={mainLink + "/tracks"} render={() => <TagTracks tag={this.props.match.params.tag} />}/>
                            </div>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getArtistsByTag: getArtistsByTag, getTracksByTag: getTracksByTag}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tag));