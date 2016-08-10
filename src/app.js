import React from 'react'
import ReactDOM from 'react-dom'

import styles from './styles.module.css'
import './app.css'

const App = React.createClass({
    render: () => (
        <div className={ styles.container }>
            <h1>Environment: { __NODE_ENV__ }</h1>
        </div>
    ),
});

// Mount App to #root node.
ReactDOM.render(<App/>, document.querySelector('#root'));
