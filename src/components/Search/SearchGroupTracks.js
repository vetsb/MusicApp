import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import store from '../../store';
import {searchTracks} from "../../actions/searchTracks";
import SearchGroup from "./SearchGroup";

class SearchMain extends Component {
    constructor() {
        super();

        this.state = {
            searchTracks: [],
            query: "",
        };
    }

    componentDidMount() {
        const query = this.props.query;

        this.props.searchTracks(query, 3);

        this.unsubscribe = store.subscribe(() => {
            const storeState = store.getState();

            const tracks = Object.keys(storeState.searchTracks).length === 0 ? [] : storeState.searchTracks;

            this.setState({
                tracks: tracks,
                query: query,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

// <div className="search__dropdown_group search__dropdown_group--tracks" ref="searchTracks">
// <h3>Треки</h3>
// <div className="search__dropdown_items">
// {this.state.tracks.map((item, key) => {
//     return <SearchItem item={item} key={key} type="track" onLinkClick={this.props.onLinkClick}/>
// })}
// </div>
// </div>

    render() {
        return <SearchGroup type="tracks" items={this.state.tracks} onLinkClick={this.props.onLinkClick}/>
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({searchTracks: searchTracks}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchMain));