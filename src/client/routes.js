import Home from 'containers/home'
import HireMe from 'containers/hireme'
import Portfolio from 'containers/portfolio'
import Timeline from 'containers/timeline'
import Error from 'containers/error'

export default [
  {
    path: '/hireme',
    regex: '/hireme',
    component: HireMe,
    name: 'Hire Me!'
  },
  {
    path: '/portfolio',
    regex: '/portfolio/:slug?',
    component: Portfolio,
    name: 'Portfolio'
  },
  {
    path: '/timeline',
    regex: '/timeline',
    component: Timeline,
    name: 'Timeline'
  },
  {
    path: '/404',
    regex: '/404',
    component: Error,
    name: '404',
    hidden: true
  },
  {
    path: '/',
    regex: '/',
    component: Home,
    name: 'Home'
  }
]
