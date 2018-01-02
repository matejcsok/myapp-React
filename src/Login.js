import React from 'react'
import {Button, Checkbox, Form} from 'semantic-ui-react'
import styles from './components/styles';

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
        }
        return (
            <div>
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

export default Login;