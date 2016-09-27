import React from 'react';
import Register from './Register';
import {Slider, Slide} from 'react-materialize';

class Landing extends React.Component {
	constructor(props){
		super(props);
		this.state = { showForm: false };
		this.toggleForm = this.toggleForm.bind(this);
		this.form = this.form.bind(this);
	}

	toggleForm(e){
		e.preventDefault();
		this.setState({ showForm: !this.state.showForm })
	}

	form() {
		if (this.state.showForm) {
			return (
	      <div>
					<Register />
				</div>
			)
		} else {
			return null
		}
	}


	render(){

		return(
			<div className='container'>
				<div className='row'>
					<h1 className='col s7 offset-s3 sitefont'>Cooledge</h1>
					<p className="sitefont">For College Kids</p>
					{/*Landing Image Slider*/}
					<div className='col s12'>
						<Slider>
							<Slide title='Make Friends' src='https://upload.wikimedia.org/wikipedia/commons/d/dc/Two_Friends_Shaking_Hands.jpg'>
							</Slide>
						</Slider>
					</div>

					<img className='col s3'
						src="https://upload.wikimedia.org/wikipedia/commons/d/dc/9.13.09GuyDelisleByLuigiNovi.jpg"
						alt="some_text"
					/>

					{/* Guy side */}
					<div className='col s3 flow-text blue darken-4'>
						<span className='col s4 offset-s4' style={{textDecoration: 'underline'}}>Has:</span>
						<img className='col s5 offset-s4'
							src="http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c02931617.png"
							alt="some_text"
						/>
						<span className='col s4 offset-s4' style={{textDecoration: 'underline'}}>Needs:</span>
						<img className='col s5 offset-s4'
							src="http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c02931617.png"
							alt="some_text"
						/>
					</div>

					{/* Girl side */}
					<div className='col flow-text s3 pink darken-4'>
						<span className='col s4 offset-s4' style={{textDecoration: 'underline'}}>Has:</span>
						<img className='col s5 offset-s4'
							src="http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c02931617.png"
							alt="some_text"
						/>
						<span className='col s4 offset-s4' style={{textDecoration: 'underline'}}>Needs:</span>
						<img className='col s5 offset-s4'
							src="http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c02931617.png"
							alt="some_text"
						/>
					</div>

					<img className='col s3'
						src="http://www.publicdomainpictures.net/pictures/20000/velka/girl-with-red-apple-112979690098uy.jpg"
						alt="some_text"	
					/>

				<div className='row'>
					<button id='toggle' className='btn col s2 offset-s5' onClick={this.toggleForm}>Register now</button>
				</div>
				{/* render form*/}
        { this.form() }
			</div>
		</div>
		)
	}
}

export default Landing;
