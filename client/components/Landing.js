import React from 'react';
import $ from 'jquery';
import Register from './Register';
import Carousel from './Carousel';

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
					<Register history={this.props.history} />
				</div>
			)
		} else {
			return null
		}
	}


	render(){

		return(
		<div>
			<div className="row top">
				<div id='toggle' className='col s12 m12'>
					<h1 className='sitefont bigtext shadow center-align white-text'>Trade Square</h1>
					<h3 className='small-shadow center-align white-text'>The University Bartering App</h3>
					<div  className='col s12 m12'>
						<br />
						<button  className='btn btn-large waves-effect waves-light col s2 offset-s5 blue-grey' onClick={this.toggleForm}>Register now</button>
					</div>
				</div>
			</div>
				{/* render form*/}
	      { this.form() }

			<div className="row">
				<div className="center-align info col m4 blue-grey"><h4 className="white-text bigger">Have Something You Don't Need?</h4></div>
				<div className="center-align info col m4 blue-grey"><h4 className="white-text bigger">Need Something You Want To Trade For?</h4></div>
				<div className="center-align info col m4 blue-grey"><h4 className="white-text bigger">Try Bartering With Coollege Today!</h4></div>
			</div>
			
			<Carousel />
		</div>
		)
	}
}

export default Landing;
