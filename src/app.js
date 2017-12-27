import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/layout/Home';
import {Provider} from 'react-redux'
import initStore from './store'
const store = initStore();
class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <Home />
            </Provider>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
)