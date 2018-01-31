import React from 'react'
import {Button, Checkbox, Form} from 'semantic-ui-react'
import styles from './components/styles';

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
    }

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/'/>;
        } else if(this.props.isLogged) {
            return <Redirect to='/'/>;
        }
        return (
            <div style={{width: '80%', margin: '0 auto'}}>
                <h1>LogIn</h1>

                <Form style={styles.universal.container}>
                    <Form.Field>
                        <label>Email</label>
                        <input type="text" name="email" ref={node => this.email = node}
                               style={{width: '300px',}} placeholder='Email'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input name="password" ref={node => this.password = node} style={{width: '300px',}}
                               type="password"
                               placeholder='Password'/>
                    </Form.Field>

                    <Button onClick={data => axios.post('/login', {
                        email: this.email.value,
                        password: this.password.value,
                    }).then(() => this.setState({redirect: true}))
                        .catch(e => console.log('Error: ', e))} type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}

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
    }))(Login);