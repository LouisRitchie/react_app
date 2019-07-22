import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Header from 'components/header'
import Footer from 'components/footer'
import routes from 'src/routes.js'
import TransitionContainer from 'containers/transitionContainer'
import './styles.css'

class App extends Component {
  state = {
    lightsOn: false // when lights off, opacity is 0.
  }

  _hitLightSwitch = () => this.setState({ lightsOn: !this.state.lightsOn })

  render() {
    const { lightsOn } = this.state

    // TODO update this SSR guard with something better.
    const containerClassName = window ? `container ${lightsOn ? 'lightsOn' : ''} ${window.location.pathname.split('/')[1]}Container` : ''

    return (
      <div className="app">
        <Header />

        <div className={containerClassName}>
          <Switch>
            {routes.map(({component: Component, name, path, regex}) => (
              <Route exact key={path} path={regex} render={(props) => (
                <TransitionContainer hitLightSwitch={this._hitLightSwitch} match={props.match}>
                  <Component {...props} />
                </TransitionContainer>
              )} />
            ))}
            <Redirect from='/*' to='/404' />
          </Switch>
        </div>

        <Footer />
      </div>
    )
  }
}

export default App
