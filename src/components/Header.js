import React from 'react';


class Header extends React.Component {

    render() {
        return (
            <div>
                <nav>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                Menu 1
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header;