import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import store from '../../store';
import {searchTracks} from "../../actions/searchTracks";
import SearchItem from "../SearchItem";

class SearchTracks extends Component {
    constructor() {
        super();

        this.state = {
            searchTracks: [],
            loading: true,
            query: "",
        };
    }

    componentDidMount() {
        let params = {};

        if (this.props.location.search === "") {
            this.setState({
                loading: false,
            });
        } else {
            params = JSON.parse('{"' + decodeURI(this.props.location.search.substr(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

            this.props.searchTracks(params.q, 20);

            this.unsubscribe = store.subscribe(() => {
                console.log("Subscribe", store.getState());

                this.setState({
                    searchTracks: Object.keys(store.getState().searchTracks).length === 0 ? [] : store.getState().searchTracks,
                    loading: false,
                    query: params.q
                });
            });
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        console.log(this.state);

        if (!this.state.loading && this.state.query === "") {
            return (
                <div className="search__results">
                    <div className="container">
                        <div className="loading">Пустой запрос.</div>
                    </div>
                </div>
            );
        }

        if (this.state.loading) {
            return (
                <div className="search__results">
                    <div className="container">
                        <div className="loading">Загрузка...</div>
                    </div>
                </div>
            );
        }

        if (!this.state.loading && this.state.searchTracks.length === 0) {
            return (
                <div className="search__results">
                    <div className="container">
                        <div className="loading">Ничего не найдено.</div>
                    </div>
                </div>
            );
        }

        return (
            <div className="search__results">
                <div className="search__dropdown_items">
                    {this.state.searchTracks.map((item, key) => {
                        return <SearchItem item={item} key={key} type="track" onLinkClick={this.togglePage}/>
                    })}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({searchTracks: searchTracks}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchTracks));