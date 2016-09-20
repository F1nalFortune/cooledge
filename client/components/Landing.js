import React from 'react';
import $ from 'jquery';

class Landing extends React.Component {
	constructor(props){
		super(props);
		this.state = { showForm: false };
		this.toggleForm = this.toggleForm.bind(this);
	}

	componentDidMount(){
		$('#toggle').click( function(){
			$('.form').toggle('show')
		})
	}

	toggleForm(e){
		e.preventDefault();
		this.state.showForm = !this.state.showForm;
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

				<div>
					<form className="form" style={{ display: 'none' }}>
						<input />
						<button>
						radarada
						</button>
					</form>
				</div>

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