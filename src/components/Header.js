import React, {Component} from 'react'
import {Button, Dropdown, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {activeItem: 'home'}
    }


    render() {
        const {activeItem} = this.state;

        return (
            <Menu size='mini'>
                <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'}
                           onClick={(e, {name}) => this.setState({activeItem: name})}/>


                <Menu.Menu position='right'>


                    <Menu.Item>
                        <form  action="/singup">
                            <Button primary>Sign Up</Button>
                        </form>

                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}
