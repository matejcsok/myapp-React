import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/layout/Home';
import Header from './components/Header';

import {BrowserRouter, Route} from 'react-router-dom';

import {Provider} from 'react-redux'
import initStore from './store'
const store = initStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Header/>
                    <Home />
                </div>

            </Provider>
        )
    }
}


ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/" component={App}/>

        </div>
    </BrowserRouter>,
    document.getElementById("root")
);