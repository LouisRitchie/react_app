import React from 'react'
import ReactDOM from 'react-dom'
import 'styles/index.css'
import 'styles/variables.css'
import App from './containers/app'
import { BrowserRouter } from 'react-router-dom'

const ROOT = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// using .hydrate() instead of .render() allows React to use existing server-rendered markup, if present.
ReactDOM.hydrate(app, document.getElementById('root'))

// exporting the root JSX allows us to import it into the Express server for SSR.
export default ROOT
