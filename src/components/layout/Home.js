import React, {Component} from 'react';
import {connect} from 'react-redux'
import Todo from '../view/Todo'
// import styles from '../styles';
import {Redirect} from 'react-router-dom';

// import Comments from '../continers/Comments'
import axios from 'axios'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matejcsok: null,


        }
    }

    componentWillMount() {
        axios.get('/matejcsok')
            .then(data => {

            console.log(data.data);

            const fromDb = data.data;

            if(!Array.isArray(data.data) && data.data == false){
                this.props.notLoggedIn()
            } else {

                this.props.loggedIn();
                this.props.fillTodos(fromDb);
            }



        }).catch(e => console.log(e))

    }

    render() {


        if (!this.props.isLogged) {
            console.log('redirectiong');
            return <Redirect to='/login'/>;
        }

        return (

            <div style={{width: '80%', margin: 'auto',}} >

                        <div style={{ display: 'flex'}} >
                            <input style={{marginBottom: '20px', borderRadius: '4px', width: '400px', height: '34px', flex: '1'}} type="text" name="data" ref={node => this.inputField = node}/>
                            <button style={{flex: '0.2', height: '34px'}} onClick={(data) => {
                                this.props.addTodo(this.inputField.value);
                                axios.post('/matejcsok', {text: this.inputField.value}).then(res => res)
                            }}>
                                Add new todo
                            </button>
                        </div>




                        {this.props.todos.map((todo, i) =>
                            <Todo style={{display: 'block'}}  key={i} deleteTodo={this.props.deleteTodo} todo={todo} index={i}/>)}


            </div>
        )
    }
}
// (data) => {
//     axios.post('/matejcsok', { text: this.inputField }).then(res => console.log(res))
// }

export default connect(
    state => ({
        name: state.name,
        todos: state.todos,
        isLogged: state.isLogged,
    }),
    dispatch => ({
        changeName: newName => dispatch({type: 'EDIT_NAME', newName}),
        deleteName: () => dispatch({type: 'DELETE_NAME'}),
        addTodo: newTodo => dispatch({type: 'ADD_TODO', newTodo}),
        deleteTodo: currentTodo => dispatch({type: 'DELETE_TODO', currentTodo}),
        fillTodos: fromDb => dispatch({type: 'FILL_TODOS', fromDb}),
        loggedIn: () => dispatch({type: 'LOGGED'}),
        notLoggedIn: () => dispatch({type: 'NOT_LOGGED'}),
    }))(Home);