import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {getTopTracks} from "../actions/toptracks";
import {connect} from "react-redux";

class Error404 extends Component {
    render() {
        return (
            <h1>404. Not Found</h1>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getTopTracks: getTopTracks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Error404)
