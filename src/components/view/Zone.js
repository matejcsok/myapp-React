import React from 'react';
import styles from '../styles.js'

class Zone extends React.Component {
    render() {
        return (

            <div style={styles.zone.container}>
                <h2 style={styles.zone.header}><a style={styles.zone.title} href="#">{this.props.zone.name}</a></h2>
                <span className="details">{this.props.zone.zipCode}</span><br />
                <span className="details">{this.props.zone.numComments} Comments</span>
            </div>

        )
    }
}

export default Zone;