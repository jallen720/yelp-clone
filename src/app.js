import React from 'react'
import ReactDOM from 'react-dom'

import styles from './styles.module.css'
import './app.css'
import 'font-awesome/css/font-awesome.css'

const App = React.createClass({
    render: () => (
        <div className={ styles['container'] }>
            <span>Environment: { __NODE_ENV__ }</span>
            <span className='fa fa-star'></span>
        </div>
    ),
});

// Mount App to #root node.
ReactDOM.render(<App/>, document.querySelector('#root'));
