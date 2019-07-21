import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import icons, { displayNames } from 'static/icons'

class Disciplines extends Component {
  static propTypes = {
    disciplines: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div className='disciplines'>
        {
          this.props.disciplines.map(slug => (
            <span>
              {icons[slug]}&nbsp;
              <span><em>{displayNames[slug]}</em>&nbsp;</span>
            </span>
          ))
        }
      </div>
    )
  }
}

export default Disciplines
