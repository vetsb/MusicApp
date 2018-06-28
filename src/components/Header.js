import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import TextField from "@material-ui/core/es/TextField/TextField";
import {Link, withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {searchTracks} from "../actions/searchTracks";
import store from '../store';
import SearchItem from "./SearchItem";
import {searchArtists} from "../actions/searchArtists";
import {searchAlbums} from "../actions/searchAlbums";

class Header extends Component {
    constructor() {
        super();

        this.state = {
            searchQuery: "",
            searchTracks: [],
            searchArtists: [],
            searchAlbums: [],
        };

        this.searchDelay = 300;
        this.timeout = null;

        window.addEventListener("click", (event) => {
            if (this.refs.dropdown.classList.contains("_open") && event.target.closest('.search') === null) {
                this.hideDropdown();
            }
        });
    }

    searchWithDelay = (callback, value) => {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(function() {
            callback();
        }, this.searchDelay);

        this.setState({
            searchQuery: value
        })
    };

    search = () => {
        const query = this.state.searchQuery;

        this.props.searchTracks(query, 3);
        this.props.searchArtists(query, 3);
        this.props.searchAlbums(query, 3);

        this.unsubscribe = store.subscribe(() => {
            const storeState = store.getState();

            const tracks = Object.keys(storeState.searchTracks).length === 0 ? [] : storeState.searchTracks;
            const artists = Object.keys(storeState.searchArtists).length === 0 ? [] : storeState.searchArtists;
            const albums = Object.keys(storeState.searchAlbums).length === 0 ? [] : storeState.searchAlbums;

            if (this.state.searchQuery !== query) {
                this.setState({
                    searchQuery: query,
                    searchTracks: tracks,
                    searchArtists: artists,
                    searchAlbums: albums,
                });

                this.showDropdown();
            }
        });
    };

    showDropdown = () => {
        this.refs.dropdown.classList.add("_open");
    };

    hideDropdown = () => {
        this.refs.dropdown.classList.remove("_open");
        this.unsubscribe();
    };

    togglePage = () => {
        this.setState({
            searchQuery: this.state.searchQuery,
            searchTracks: [],
            searchArtists: [],
            searchAlbums: [],
        });
        this.hideDropdown();
    };

    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="header__row">
                        <Link to="/" className="header__main-link">Главная</Link>

                        <div className="search">
                            <Grid
                                container
                                alignItems="center"
                                justify="center">
                                <TextField
                                    placeholder="Поиск музыки"
                                    onChange={(e) => this.searchWithDelay(this.search, e.target.value)}/>
                                <Button style={{marginLeft: 10}} variant="contained" color="primary" onClick={() => this.search()}>Найти</Button>
                            </Grid>

                            <div className="search__dropdown" ref="dropdown">
                                { this.state.searchQuery !== "" && this.state.searchTracks.length === 0 && this.state.searchArtists.length === 0 && this.state.searchAlbums.length === 0 ? (
                                    <div className="search__dropdown_not-found">Ничего не найдено.</div>
                                ) : (
                                    <div>
                                        <div className="search__dropdown_show-all">
                                            <Link to={"/search?q=" + this.state.searchQuery} onClick={() => this.togglePage()}>Смотреть все результаты поиска</Link>
                                        </div>
                                        <div className="search__dropdown_groups">
                                            { this.state.searchTracks.length !== 0 ? (
                                                <div className="search__dropdown_group search__dropdown_group--tracks" ref="searchTracks">
                                                    <h3>Треки</h3>
                                                    <div className="search__dropdown_items">
                                                        {this.state.searchTracks.map((item, key) => {
                                                            return <SearchItem item={item} key={key} type="track" onLinkClick={this.togglePage}/>
                                                        })}
                                                    </div>
                                                    <div className="search__dropdown_show-all">
                                                        <Link to={"/search/tracks?q=" + this.state.searchQuery} onClick={() => this.togglePage()}>Смотреть все треки</Link>
                                                    </div>
                                                </div>
                                            ) : null}

                                            { this.state.searchArtists.length !== 0 ? (
                                                <div className="search__dropdown_group search__dropdown_group--artists" ref="searchArtists">
                                                    <h3>Исполнители</h3>
                                                    <div className="search__dropdown_items">
                                                        {this.state.searchArtists.map((item, key) => {
                                                            return <SearchItem item={item} key={key} type="artist" onLinkClick={this.togglePage}/>
                                                        })}
                                                    </div>
                                                    <div className="search__dropdown_show-all">
                                                        <Link to={"/search/artists?q=" + this.state.searchQuery} onClick={() => this.togglePage()}>Смотреть всех исполнителей</Link>
                                                    </div>
                                                </div>
                                            ) : null}

                                            { this.state.searchAlbums.length !== 0 ? (
                                                <div className="search__dropdown_group search__dropdown_group--albums" ref="searchAlbums">
                                                    <h3>Альбомы</h3>
                                                    <div className="search__dropdown_items">
                                                        {this.state.searchAlbums.map((item, key) => {
                                                            return <SearchItem item={item} key={key} type="album" onLinkClick={this.togglePage}/>
                                                        })}
                                                    </div>
                                                    <div className="search__dropdown_show-all">
                                                        <Link to={"/search/albums?q=" + this.state.searchQuery} onClick={() => this.togglePage()}>Смотреть все альбомы</Link>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchTracks: searchTracks,
        searchArtists: searchArtists,
        searchAlbums: searchAlbums
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
