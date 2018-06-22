import React, { Component } from 'react';
import Link from "react-router-dom/es/Link";

class Track extends Component {
    constructor() {
        super();

        console.log(this.props);

        this.state = {
            toptracks: {
                track: [
                    // {
                    //     name: '',
                    //     artist: {
                    //         name: '',
                    //         mbid: ''
                    //     },
                    //     image: [
                    //         {
                    //             url: '',
                    //             size: '',
                    //         }
                    //     ],
                    // }
                ],
                attr: {
                    page: 1,
                    perPage: 5,
                }
            }
        };
    }

    render() {
        fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=4db31c2da6da643ed02bce6da1c744b3&format=json&page=1&limit=10")
            .then(response => response.json())
            .then(response => {
                this.setState({
                    toptracks: response.tracks
                })
            });

        return (
            <div className="track">
                <div className="container">
                    <h1>Track</h1>
                </div>
            </div>
        );
    }
}

export default Track;
