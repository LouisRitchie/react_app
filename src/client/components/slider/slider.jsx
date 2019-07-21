import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scroll$ } from 'lib/observables.js'
import { interval } from 'rxjs/observable/interval'
import { take } from 'rxjs/operators/take'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/sample'
import 'rxjs/add/operator/takeUntil'
import './styles.css'

class Slider extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    once: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    startPositionX: PropTypes.number,
    startPositionY: PropTypes.number,
    style: PropTypes.object
  }

 /* This component recieves at least one starting position for either X or Y axis.
  * If both are provided, pick an axis randomly.
  * The start positions are relative to resting place of the component as it mounts.
  * You must also supply children that will slide into view.
  */
  constructor({startPositionX, startPositionY}) {
    super()

    let startPosition = 0
    let axis = 0 // 0 is x axis, 1 is Y axis
    let coefficient = 1 // when 0, we have arrived at resting position
    if (startPositionX && startPositionY) {
      if (Math.random() < 0.5) {
        startPosition = startPositionX
        axis = 0
      } else {
        startPosition = startPositionY
        axis = 1
      }
    } else if (startPositionX) {
      startPosition = startPositionX
      axis = 0
    } else {
      startPosition = startPositionY
      axis = 1
    }

    this.state = {
      startPosition,
      axis,
      coefficient
    }
  }

 /* set up the scroll position observable, which shall emit the latest scroll position every 100ms.
  * This way, we only show the component when it's resting position is on screen
  */
  componentWillMount() {
    this._unmount$ = (new Subject).pipe(take(1))
    this._pollScrollPosition$ = scroll$.sample(interval(100)).takeUntil(this._unmount$)

    this._pollScrollPosition$.subscribe(({pageX, pageY}) => (
      this.setState({ coefficient: this._getCoefficient() })
    ))
  }

  componentDidMount() {
    this.setState({ coefficient: this._getCoefficient() })

    if (this.props.once) {
      this._unmount$.next()
    }
  }

  componentWillUnmount() {
    this._unmount$.next()
  }

 /* coefficient === 0: image at full opacity and resting at final position
  * 0 < coefficient < 1: image is transitioning
  * coefficient === 1: image at zero opacity and resting at start position.
  *
  * don't call this before the component mounts.
  */
  _getCoefficient = () => {
    const distance = this.state.axis
      ? document.documentElement.clientHeight - this.refs[this.props.id].getBoundingClientRect().top
      : document.documentElement.clientWidth - this.refs[this.props.id].getBoundingClientRect().left

    const coefficient = 1 - distance / this.state.startPosition

    if (coefficient < 0) {
      return 0
    }

    if (coefficient > 1) {
      return 1
    }

    return coefficient
  }

  render() {
    return (
      <div ref={this.props.id} className='sliderContainer' style={this.props.style}>
        <div
          className='box'
          style={{
            ...(this.state.axis === 0
              ? {
                left: this.state.coefficient * this.state.startPosition,
                transition: `left ${this.state.startPosition / 300}s ease-out, opacity ${this.state.startPosition / 300}s ease-out`
              } : {
                top: this.state.coefficient * this.state.startPosition,
                transition: `top ${this.state.startPosition / 300}s ease-out, opacity ${this.state.startPosition / 300}s ease-out`
              }
            ),
            opacity: Math.abs(1 - this.state.coefficient)
          }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Slider
