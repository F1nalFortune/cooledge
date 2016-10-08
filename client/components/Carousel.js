import React from 'react'
import { Slider, Slide } from 'react-materialize'
class Carousel extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    
    return (
      <div>
        <Slider className="slides" indicators={ false }
          >
          <Slide 
          src="http://res.cloudinary.com/mydevpoint/image/upload/v1475902084/josh_long_khb0lv.jpg"
          >
          </Slide>
          <Slide 
          src="http://res.cloudinary.com/mydevpoint/image/upload/v1475902077/brett_long_eaemwm.jpg"
          >
          </Slide>
          <Slide 
          src="http://res.cloudinary.com/mydevpoint/image/upload/v1475902092/lorna_long_rlrtlo.jpg"
          >
          </Slide>
        </Slider>
      </div>
     
    )
  }
}

export default Carousel
