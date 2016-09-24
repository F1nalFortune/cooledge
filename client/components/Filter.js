import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setFilter } from '../actions';
import Items from './Items';

class Filter extends React.Component {
	constructor(props) {
		super(props);
	}	

	setFilter(category) {
	  this.props.dispatch(setFilter(category))
	}

	render() {
		return (
			<div>
			  <a onClick={() => this.setFilter('school')}>School Supplies</a>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
  return { filter: state.filter};
}

export default connect(mapStateToProps)(Filter);
/*
function(category){
	for
}

*/