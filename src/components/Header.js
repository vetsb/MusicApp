import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import TextField from "@material-ui/core/es/TextField/TextField";
import {Link} from "react-router-dom";

class Header extends Component {
    constructor() {
        super();

        this.state = {
            searchValue: '',
        };
    }

    search = () => {

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
                                <TextField placeholder="Поиск музыки" onChange={(e) => this.setState({searchValue: e.target.value})}/>
                                <Button style={{marginLeft: 10}} variant="contained" color="primary" onClick={() => this.search()}>Найти</Button>
                            </Grid>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
