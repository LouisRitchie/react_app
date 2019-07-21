import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Disciplines from 'components/disciplines'
import Detail from 'components/detail'
import Slider from 'components/slider'
import items from 'static/items.json5'
import { resize$ } from 'lib/observables.js'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/takeUntil'
import './styles.css'

class Portfolio extends Component {
  state = {
    isMobile: false
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
    }

    if (!this.state.isMobile && document.documentElement.clientWidth < 750) {
      return this.setState({ isMobile: true })
    }
  }

  render() {
    return (
      <div className='portfolio'>
        <div className='splash'>
          <div className='splashHeading'>
            <h1>Portfolio</h1>
            {this.props.match.params.slug && <h3 onClick={this.props.history.goBack} className='backButton'>{'<< Go Back'}</h3>}
          </div>
        </div>

        <Route key='/portfolio/:slug' path='/portfolio/:slug' render={(props) =>
          (
            <Detail {...props} />
          )} />

        <Route exact key='/portfolio' path='/portfolio' render={() =>
          (
            <div className='portfolioItems'>
              {
                Object.keys(items).map((slug, i) => (
                  <Slider once style={this.state.isMobile ? {width: 298, height: 130} : {width: 340, height: 150}} id={slug} startPositionX={1 + 15 * i}>
                    <Link className='portfolioItem' to={`/portfolio/${slug}`}>
                      <h3 className='itemHeading'>{items[slug].heading}</h3>
                      <h4 className='itemSubheading'>{items[slug].subheading}</h4>
                      <Disciplines disciplines={items[slug].disciplines} />
                    </Link>
                  </Slider>
                ))
              }
            </div>
          )} />
      </div>
    )
  }
}

export default Portfolio
