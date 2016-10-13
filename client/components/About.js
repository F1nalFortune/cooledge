import React from 'react';


class About extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    window.jQuery('.carousel.carousel-slider').carousel({full_width: true, indicators: true});
  }

  render(){
    return(
      <div className='row bck about'>

        <div className='col s12 m8 offset-m2'>
          <h1 className='col s12 center white-text'>About the Team and App</h1>
        </div>

        {/*
          this is the start of each persons about.
          Replace img src with your image
          Be sure to replace the href with appropriate links.
          Make sure that at the start of every set of 3, use the first template
          templates 2 is for every second and third
          (ex. template-1 template-2 temp-2 
          temp-1 temp-2 temp-2)
        */}

        {/*template 1
        <div className='row about-back col s12 m2 offset-m2'>

          <img 
            className='col s6 offset-s3 offset-m1 m10  about-pic'
            src='http://vignette3.wikia.nocookie.net/blossom/images/d/da/Sonia90.jpg/revision/latest?cb=20131112131310'
          />

          <p className='col offset-s3 s6 offset-m1 m10'>
            This is a paragraph about the you.
          </p>

          <i className="col m3 fa fa-github fa-2x" aria-hidden="true"></i><a href="#" className='about-link col m9 center'>Github</a>
          <i className="col m3 fa fa-linkedin fa-2x" aria-hidden="true"></i><a href='#' className='about-link col m9 center'>LinkedIn</a>
          <i className='col m3 fa fa-envelope fa-2x' aria-hidden='true'></i><a href='#' className='about-link col m9 center'>E-mail</a>
        </div>
        */}

        
        {/*template 2
        <div className='row about-back col s12 m2 offset-m1'>
          <img 
            className='col s6 offset-s3 offset-m1 m10  about-pic'
            src='http://vignette3.wikia.nocookie.net/blossom/images/d/da/Sonia90.jpg/revision/latest?cb=20131112131310'
          />
          <p className='col offset-s3 s6 offset-m1 m10'>
            This is a paragraph about the people. sdkasdads d dsfkasdf ds fds kdsa kdsak fs jkdfjkfsdjk
          </p>
          <i className="col m3 fa fa-github fa-2x" aria-hidden="true"></i><a href="#" className='about-link col m9 center'>Github</a>
          <i className="col m3 fa fa-linkedin fa-2x" aria-hidden="true"></i><a href='#' className='about-link col m9 center'>LinkedIn</a>
          <i className='col m3 fa fa-envelope fa-2x' aria-hidden='true'></i><a href='#' className='about-link col m9 center'>E-mail</a>
        </div>
        */}

      </div>
    )
  }
}

export default About;
