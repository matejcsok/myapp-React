import React from 'react';
import Zone from '../view/Zone';

class Zones extends React.Component {
    constructor() {
        super()

        this.state = {
            list: [
                { name: 'Zone 1', zipCode: '10012', numComments: 10 },
                { name: 'Zone 2', zipCode: '10013', numComments: 20 },
                { name: 'Zone 3', zipCode: '10014', numComments: 30 },
                { name: 'Zone 4', zipCode: '10015', numComments: 40 }
            ]
        }

    }
    render() {
        return (
            <div>
                <ol>
                    {this.state.list.map((zone, i) => <li key={i}><Zone zone={zone} /></li>)}
                </ol>
            </div>
        )
    }
}

export default Zones;