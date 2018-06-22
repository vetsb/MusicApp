import React, { Component } from 'react';
import Header from "./components/Header";
import {Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Main from "./containers/Main";
import Artist from "./containers/Artist";
import Chart from "./containers/Chart";

class App extends Component {
    constructor() {
        super();

        this.history = createBrowserHistory();
        this.history.listen(() => {
            window.scrollTo(0,0);
        });
    }

    render() {
        return (
            <Router history={this.history}>
                <div className="wrapper">
                    <Header />

                    <div className="inner">
                        <Route exact path="/" component={Main}/>
                        <Route path="/music/:artist" component={Artist}/>
                        {/*<Route exact path="/music/:artist/:track" component={Track}/>*/}
                        <Route exact path="/chart" component={Chart}/>
                    </div>

                    <footer className="footer">
                        <div className="container">
                            Footer
                        </div>
                    </footer>
                </div>
            </Router>
        );
    }
}

export default App;
