import React, { Component } from 'react';
import { connect } from 'react-redux'
import Zones from '../containers/Zones'
import Todo from '../view/Todo'
import Header from '../Header'
// import Comments from '../continers/Comments'
import axios from 'axios'
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { matejcsok: null }
    }
    componentDidMount() {
        axios.get('/matejcsok').then(data => this.setState({ matejcsok: data }))
    }
    // postData(data){
    //     axios.post('/matejcsok', {
    //         text:data
    //     }).then(res => console.log(res))
    // }
    render() {
        return (
            <div className="container">
                {this.props.name} <br />
                {this.state.matejcsok && this.state.matejcsok.data.text}<br />
                {this.props.todos}
                <div className="row">
                    <div className="col-md-4">
                        {/* <Zones /> */}
                    </div>
                    <div className="col-md-8">
                        <input type="text" name="data" ref={node => this.inputField = node} />
                        <button onClick={() => this.props.addTodo(this.inputField.value)}>Add to todo</button>
                        <button onClick={() => this.props.changeName(this.inputField.value)}>change Name</button>
                        <button onClick={() => this.props.deleteName()}>delete name</button>
                        <button onClick={data => axios.post('/matejcsok',
                            { text: this.inputField.value }).then(res => console.log(res))
                        }>submit</button>

                        <ul>
                            {this.props.todos.map((todo, i) => <li key={i}><Todo deleteTodo={this.props.deleteTodo} todo={todo} index={i} /></li>)}
                        </ul>

                    </div>
                </div>
            </div>
        )
    }
}
(data) => {
    axios.post('/matejcsok', { text: this.inputField }).then(res => console.log(res))
}

export default connect(
    state => ({
        name: state.name,
        todos: state.todos
    }),
    dispatch => ({
        changeName: newName => dispatch({ type: 'EDIT_NAME', newName }),
        deleteName: () => dispatch({ type: 'DELETE_NAME' }),
        addTodo: newTodo => dispatch({ type: 'ADD_TODO', newTodo }),
        deleteTodo: currentTodo => dispatch({ type: 'DELETE_TODO', currentTodo })
    }))(Home);