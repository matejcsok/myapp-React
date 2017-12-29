import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import styles from './components/styles';

const Singup = () => (
    <Form style={styles.universal.container}>
        <Form.Field>
            <label>Email</label>
            <input style={{width: '300px',}} placeholder='Email' />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input style={{width: '300px',}} type="password" placeholder='Password' />
        </Form.Field>

        <Button type='submit'>Submit</Button>
    </Form>
);

export default Singup