import React, { Component } from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import routes from 'src/routes.js'

class Header extends Component {
  render() {
    const navItemClassName = window ? `navItem ${window.location.pathname.split('/')[1] === route.path.split('/')[1] ? 'selected' : ''}` : ''

    return (
      <div className="header">
        <h1 className="title"><Link to='/'>Louis Ritchie</Link></h1>
        <div className="nav">
          {routes.slice(0).reverse().filter(({hidden}) => !hidden).map(route => (
            <Link
              key={route.path}
              to={route.path}
              className={navItemClassName}>
              {route.name}
            </Link>
          ))}
          <a href="https://blog.louisritchie.com" className="navItem">Blog >>></a>
        </div>
      </div>
    )
  }
}

export default Header
