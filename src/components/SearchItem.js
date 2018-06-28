import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import store from '../store';
import {getArtist} from "../actions/artist";
import {getAlbumById} from "../actions/album";

class SearchItem extends Component {
    render() {
        const item = this.props.item;
        let content = null;

        switch(this.props.type) {
            case "tracks":
                content = (
                    <div className="search__dropdown_info">
                        <div className="search__dropdown_name">{item.name}</div>
                        <div className="search__dropdown_artist">
                            <Link to={"/music/" + item.artistMbid} onClick={() => {
                                this.props.onLinkClick();
                                store.dispatch(getArtist(item.artistMbid));
                                this.props.history.push("/music/" + item.artistMbid);
                            }}>{item.artist}</Link>
                        </div>
                    </div>
                );
                break;
            case "artists":
                content = (
                    <div className="search__dropdown_info">
                        <div className="search__dropdown_artist">
                            <Link to={"/music/" + item.mbid} onClick={() => {
                                this.props.onLinkClick();
                                store.dispatch(getArtist(item.mbid));
                                this.props.history.push("/music/" + item.mbid);
                            }}>{item.name}</Link>
                        </div>
                    </div>
                );
                break;
            default:
            case "albums":
                content = (
                    <div className="search__dropdown_info">
                        <div className="search__dropdown_name">
                            <Link to={"/album/" + item.mbid} onClick={() => {
                                this.props.onLinkClick();
                                store.dispatch(getAlbumById(item.mbid));
                                this.props.history.push("/album/" + item.mbid);
                            }}>{item.name}</Link>
                        </div>
                        <div className="search__dropdown_artist">
                            <Link to={"/music/" + item.mbid} onClick={() => {
                                this.props.onLinkClick();
                                store.dispatch(getArtist(item.artistMbid));
                                this.props.history.push("/album/" + item.artistMbid);
                            }}>{item.artist}</Link>
                        </div>
                    </div>
                );
                break;
        }

        return (
            <div className="search__dropdown_item">
                {item.image[0]["#text"] !== "" ? (
                    <div className="search__dropdown_image">
                        <img src={item.image[0]["#text"]} alt=""/>
                    </div>
                ) : null}
                {content}
            </div>
        );
    }
}

export default withRouter(SearchItem);
