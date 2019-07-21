import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Slider from 'components/slider'
import { resize$ } from 'lib/observables.js'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/takeUntil'
import './styles.css'

class ValueProp extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    heading: PropTypes.string.isRequired,
    subheading: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  }

  state = {
    isMobile: void 0
  }

  componentDidMount() {
    this._unmount$ = (new Subject()).take(1)
    resize$.takeUntil(this._unmount$).subscribe(this._checkIfMobile)
    this._checkIfMobile()
  }

  componentWillUnmount() {
    this._unmount$.next()
  }

  _checkIfMobile = () => {
    if (this.state.isMobile && document.documentElement.clientWidth > 750) {
      return this.setState({ isMobile: false })
    } else if (!this.state.isMobile && document.documentElement.clientWidth < 750) {
      return this.setState({ isMobile: true })
    } else if (this.state.isMobile === void 0 && document.documentElement.clientWidth > 750) {
      return this.setState({ isMobile: false })
    }
  }

  render() {
    const { isMobile } = this.state

    if (isMobile === void 0) { // dont mount children until we know if mobile or not
      return null
    }

    const { description, index, heading, photoDescription, subheading, slug, extension } = this.props

    return (
      <section className={`valueProp ${index % 2 !== 0 ? 'reverse' : ''}`}>
        <div className='textContainer'>
          <div className='text'>
            <h1><Link to={`/portfolio/${slug}`}>{heading}</Link></h1>
            <h2>{subheading}</h2>
            <p>{description}</p>
          </div>
        </div>
        <Slider style={isMobile ? {width: '90vw'} : {width: '40vw'}} id={slug} startPositionY={isMobile ? 120 : 300}>
          <img
            className='photo'
            src={require(`static/images/${slug}.${extension}`)} />
          <p className='boxText'>{photoDescription}</p>
        </Slider>
      </section>
    )
  }
}

export default ValueProp
