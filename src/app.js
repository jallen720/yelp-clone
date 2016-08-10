import React from 'react'
import ReactDOM from 'react-dom'

import styles from './styles.module.css'
import './app.css'

const App = React.createClass({
    render: () => (
        <div className={ styles.container }>Text text text more text</div>
    ),
});

// Mount App to #root node.
ReactDOM.render(<App/>, document.querySelector('#root'));
