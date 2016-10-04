import React from 'react'
import { Slider, Slide } from 'react-materialize'
class Carousel extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    
    return (
      <div>
        <Slider className="slides"
          >
          <Slide 
          src="https://www.spacecitycu.com/wp-content/uploads/2014/03/testimonial.png"
          >
        </Slide>
        </Slider>
      </div>
     
    )
  }
}

export default Carousel
