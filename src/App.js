import React, {Component} from 'react';
import Header from "./components/Header";
import {Route, Router, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Main from "./containers/Main";
import Artist from "./containers/Artist";
import Chart from "./containers/Chart";
import Tag from "./containers/Tag";
import Album from "./containers/Album";
import Error404 from "./errors/Error404";
import Search from "./containers/Search";

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
                        <Switch>
                            <Route exact path="/" component={Main}/>
                            <Route path="/music/:artist" component={Artist}/>
                            <Route path="/chart" component={Chart}/>
                            <Route path="/album/:albumId" component={Album}/>
                            <Route path="/tag/:tag" component={Tag}/>
                            <Route path="/search" component={Search}/>
                            <Route component={Error404}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
