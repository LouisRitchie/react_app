import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>Contact: louis@louisritchie.com</p>
        <a href='https://github.com/louisritchie/react-app.git'>view source</a>
      </div>
    )
  }
}

export default Footer
