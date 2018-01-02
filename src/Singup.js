import React from 'react'
import {connect} from 'react-redux'
import {Button, Checkbox, Form} from 'semantic-ui-react'
import styles from './components/styles';

import {Redirect} from 'react-router-dom'
import axios from 'axios';

class Singup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            redirect: false,
        }
    }

    // componentDidMount() {
    //     axios.get('/username').then(users => {
    //         this.setState({user: users});
    //         const dbUsers = users.data;
    //         this.props.fillUsers(dbUsers);
    //         console.log(users)
    //     });
    // }

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/login'/>;
        }
        return (
            <div>
                {this.props.user.map(user => user.email + '\n')}
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

                    <Button onClick={data => axios.post('/singup', {
                        email: this.email.value,
                        password: this.password.value,
                    }).then(() => this.setState({redirect: true}))} type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
    }),
    dispatch => ({
        changeName: newName => dispatch({type: 'EDIT_NAME', newName}),
        deleteName: () => dispatch({type: 'DELETE_NAME'}),
        addTodo: newTodo => dispatch({type: 'ADD_TODO', newTodo}),
        deleteTodo: currentTodo => dispatch({type: 'DELETE_TODO', currentTodo}),
        fillTodos: fromDb => dispatch({type: 'FILL_TODOS', fromDb}),
        fillUsers: dbUsers => dispatch({type: 'FILL_USERS', dbUsers}),
    }))(Singup);