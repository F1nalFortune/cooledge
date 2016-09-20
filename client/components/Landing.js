import React from 'react';

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
					<form className="form">
						<input />
						<button>
						radarada
						</button>
					</form>
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
					<h1 className='col s7 offset-s3'>Welcome To Cooledge</h1>
				</div>
				<div className='row'>
					<button id='toggle' className='btn col s2 offset-s5' onClick={this.toggleForm}>Register now</button>
				</div>

        { this.form() }

				<div className='row'>
					<div className='col s3 blue darken-4'>
						this is the pic of a guy
					</div>
					<div className='col flow-text s3 blue darken-4'>
						this is going to be the long area where all the listed items will be listed in a list.
					</div>
					<div className='col flow-text s3 pink darken-4'>
						this is going to be the long area where all the listed items will be listed in a list.
					</div>
					<div className='col s3 pink darken-4'>
						this is the pic of the girl
					</div>
				</div>
			</div>
		)
	}
}

export default Landing;