import React from 'react';
import { Parallax } from 'react-parallax';

const Background = React.createClass({
    render: function () {
  	return (
    	<div>
        <Parallax bgImage="https://upload.wikimedia.org/wikipedia/commons/d/dc/Two_Friends_Shaking_Hands.jpg" strength={400}>
            <br/>
            <h1 className='col s7 offset-s3 sitefont'>Cooledge</h1>
        </Parallax>
      </div>
    )
  }
});

export default Background;
