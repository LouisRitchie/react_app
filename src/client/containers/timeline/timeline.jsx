import React, { Component } from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './styles.css'
import icons from 'static/icons'
import items from 'static/items.json5'
import timelineOrdering from 'static/timelineOrdering.json5'

class Timeline extends Component {
  // transform the timeline elements into links.
  componentDidMount() {
    const elements = document.getElementsByClassName('vertical-timeline-element-content')

    for (let i in elements) {
      if (isNaN(i)) {
        break
      }

      elements[i].setAttribute('data-slug', items[timelineOrdering[i]].slug)
      elements[i].addEventListener('click', ({currentTarget: {dataset: {slug}}}) => this.props.history.push(`portfolio/${slug}`))
    }
  }

  render() {
    return (
      <div className="timeline">
        <div className='splash'>
          <div className='splashHeading'>
            <h1>Timeline</h1>
          </div>
        </div>

        <VerticalTimeline>
          {timelineOrdering.map(slug => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date={items[slug].times}
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={icons[items[slug].disciplines[0]]}
            >
              <h3 className="vertical-timeline-element-title">{items[slug].heading}</h3>
              <h4 className="vertical-timeline-element-subtitle">{items[slug].subheading}</h4>
              <p>{items[slug].description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    )
  }
}

export default Timeline
