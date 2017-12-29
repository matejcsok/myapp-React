import React, { Component } from 'react';
import { connect } from 'react-redux'
import Todo from '../view/Todo'
import styles from '../styles';

// import Comments from '../continers/Comments'
import axios from 'axios'
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { matejcsok: null }
    }
    componentDidMount() {
        axios.get('/matejcsok').then(data => {
            this.setState({ matejcsok: data })
            // console.log(data.data.map(item => Object.values(item)).map(item => item[1]))
            const fromDb = data.data.map(item => Object.values(item)).map(item => item[1])
            this.props.fillTodos(fromDb)
        })

    }
    // postData(data){
    //     axios.post('/matejcsok', {
    //         text:data
    //     }).then(res => console.log(res))
    // }
    render() {
        return (
            <div style={styles.universal.container}>
                {this.props.name} <br />
                {this.state.matejcsok && this.state.matejcsok.data.text}<br />
                {this.props.todos}
                <div className="row">
                    <div className="col-md-4">
                        {/* <Zones /> */}
                    </div>
                    <div className="col-md-8">
                        <input type="text" name="data" ref={node => this.inputField = node} />
                        <button onClick={(data) => {this.props.addTodo(this.inputField.value);
                        axios.post('/matejcsok', { text: this.inputField.value }).then(res => res )
                        }}>Add to todo</button>
                        <button onClick={() => this.props.changeName(this.inputField.value)}>change Name</button>
                        <button onClick={() => this.props.deleteName()}>delete name</button>
                        <button onClick={data => axios.post('/matejcsok',
                            { text: this.inputField.value }).then(res => console.log(res))
                        }>submit</button>
                            {this.props.todos.map((todo, i) => <Todo  key={i} deleteTodo={this.props.deleteTodo} todo={todo} index={i} />)}
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
        deleteTodo: currentTodo => dispatch({ type: 'DELETE_TODO', currentTodo }),
        fillTodos: fromDb => dispatch({type: 'FILL_TODOS', fromDb})
    }))(Home);