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
        <div className="bck">
          <div id="ten" className="imageback">
            <div className="z-depth-5">
              <div className="container center">
                <div className="row">
                  <h1 className=" sitefont center white-text"> Meet the Team </h1>

                  <div className="col s4">
                    <div className="card-panel z-depth-3">
                      <img id="image-id" className="hundred" src="/images/edwin.jpg" />
                      <h5 className="card-title center crd">Edwin</h5>
                      <span className="black-text">
                        I have spent the last several years working in the field of video and audio post-production.
                        I have been able to see the power of internet development and how it creates a connection
                        with the user. I enjoy hiking, fishing, graphic art, traveling,and reading.
                      </span>
                      <br/>
                      <a className="greenz fa fa-github fa-2x" href="https://github.com/edsant1" ></a>
                      <a className="greenz fa fa-linkedin-square fa-2x" href="https://www.linkedin.com/in/edwinsantizo" ></a>
                      <br/>
                      <a className="greenz purpl buttonvw" href="edwins10329@gmail.com">edwins10329@gmail.com</a>
                    </div>
                  </div>



                  <div className="col s4">
                    <div className="card-panel white z-depth-3">
                      <img id="image-id" className="fifty" src="/images/brian.jpg" />
                      <h5 className="card-title center salt black-text crd">Brian Phelps</h5>
                      <span className="black-text"> 
                        After receiving a diploma with a focus on business marketing, I became reaquainted with computers. 
                        I have been interested in them since I was very young, and wish to use the skills I earned at DevPoint 
                        Labs in the field! I enjoy music, coding, playing sports, and learning.
                      </span>
                      <br/>
                      <a className="greenz fa fa-github fa-2x" href="https://github.com/F1nalFortune"></a>
                      <a className="greenz fa fa-linkedin-square fa-2x" href="https://www.linkedin.com/in/phelpsb92"></a>
                      <br/>
                      <a className="greenz purpl buttonvw" href="phelpsb92@gmail.com">phelpsb92@gmail.com</a>
                    </div>
                  </div>

                  <div className="col s4">
                    <div className="card-panel z-depth-3">
                      <img id="image-id" className="hundred" src="/images/josh.jpg" />
                      <h5 className="card-title center salt crd">Josh</h5>
                      <span className="black-text">
                        Josh is always looking to improve, be it at coding or everyday life. He’s positive about most things 
                        but can easily stress himself out. Enjoys playing games, rock climbing, and drawing.
                      </span>
                      <br/>
                      <a className="greenz fa fa-github fa-2x" href="https://github.com/sonicspeed123"></a>
                      <a className="greenz fa fa-linkedin-square fa-2x" href="https://www.linkedin.com/in/sahagunjoshua" ></a>
                      <br/>
                      <a className="greenz purpl buttonvw" href="joshuasahagun1996@yahoo.com">joshuasahagun1996@yahoo.com</a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>


        

    )
  }
}

export default About;
