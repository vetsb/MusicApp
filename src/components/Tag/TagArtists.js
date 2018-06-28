import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getArtistsByTag} from "../../actions/tag";
import store from '../../store';
import Similar from "../Similar";

class TagArtists extends Component {
    constructor() {
        super();

        this.state = {
            artists: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.props.getArtistsByTag(this.props.tag);

        this.unsubscribe = store.subscribe(() => {
            this.setState({
                artists: store.getState().tag.items,
                loading: false
            })
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="main">
                    <div className="loading">Загрузка...</div>
                </div>
            );
        }

        if (!this.state.loading && Object.keys(this.state.artists).length === 0) {
            return (
                <div className="main">
                    <div className="loading">Не найдено</div>
                </div>
            );
        }

        return (
            <div className="similar__items">
                {this.state.artists.map((item, key) => {
                    return (
                        <Similar item={item} key={key}/>
                    )
                })}
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getArtistsByTag: getArtistsByTag}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TagArtists)