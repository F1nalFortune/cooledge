import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { filter } from '../actions';

class Filters extends React.Component {
	constructor(props) {
		super(props);
		this.state = { filter: 'ALL'};
	}	

	setFilter(filter) {
		this.props.dispatch({ filter });
	}

	render() {
		return (
			<div>
				filtered items
			</div>
		)
	}
}

export default connect()(Filters);
