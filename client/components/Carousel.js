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
          src="http://res.cloudinary.com/mydevpoint/image/upload/v1475604285/Brett_am2bsf.jpg"
          >
          </Slide>
          <Slide 
          src="http://res.cloudinary.com/mydevpoint/image/upload/v1475604361/lorna_qmsc3o.jpg"
          >
          </Slide>
          <Slide 
          src="http://res.cloudinary.com/mydevpoint/image/upload/v1475604350/Josh_hxo9lq.jpg"
          >
          </Slide>
        </Slider>
      </div>
     
    )
  }
}

export default Carousel
