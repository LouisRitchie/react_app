import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

class HireMe extends Component {
  render() {
    return (
      <div className='hireme'>
        <img className='hiremeImage' src={require('static/images/myface.jpg')} />
        <div className='hiremeText'>
          <h2>I'm a full stack programmer with 3 years of experience.</h2>

          <p className='sellParagraph'>
            I've deployed a lot of code. I've been in company meetings every week for years.
          </p>

          <p className='sellParagraph'>
            I have been fortunate to have spent a <em>lot</em> of time building frontends, to have spearheaded major upgrades to backends, and to have designed my share of systems.
          </p>

          <p className='sellParagraph'>
            I am grateful that my programming skills had their development cost subsidized by my San Fransisco and Victoria employers. Thanks to them, I have been able to make fast progress from when I started my programming career in 2015.
          </p>

          <p className='sellParagraph'>
            I'm hungry for opportunities. I am always busy and have my hands constantly full, but if you feel that we should have a coffee, I can make time for you.
          </p>

          <h2>Let's get together.</h2>

          <p className='sellParagraph'>
            As Smerdyakov said in The Brothers Karamazov: "It's always interesting to talk to an intelligent person."
          </p>

          <p className='sellParagraph'>
            My email: <a href="mailto:louis@louisritchie.com" target="_top">louis@louisritchie.com</a>
          </p>

          <p className='sellParagraph'>
            My resume: <a href='http://louisritchie.com/resume.pdf'>Resume (July 2019)</a>
          </p>
        </div>
      </div>
    )
  }
}

export default HireMe
