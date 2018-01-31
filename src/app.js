import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/layout/Home';
import Header from './components/Header';
import Main from './Main';
import Footer from './Footer';

import {HashRouter, BrowserRouter, Route} from 'react-router-dom';

import {Provider} from 'react-redux'
import initStore from './store'
const store = initStore();

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
}


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);