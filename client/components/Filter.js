import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setFilter, fetchItemCount } from '../actions';
import Items from './Items';

class Filter extends React.Component {
	constructor(props) {
		super(props);
	}	

	setFilter(category) {
	  this.props.dispatch(setFilter(category));
	}

	setItemCount(field){
		return this.props.items.filter( item => item.category === field).length
	}

	render() {
		return (
			<div className="collection">
			  <a className="waves-effect collection-item transparent" onClick={() => this.setFilter('school')}>School Supplies<span className="badge blue-grey white-text">{this.setItemCount('school')}</span></a>
			  <a className="waves-effect collection-item transparent" onClick={() => this.setFilter('dorm')}>Dorm Supplies<span className="badge blue-grey white-text">{this.setItemCount('dorm')}</span></a>
			  <a className="waves-effect collection-item transparent" onClick={() => this.setFilter('SHOW_ALL')}>All<span className="badge blue-grey white-text">{this.props.items.length}</span></a>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
  return { filter: state.filter, count: state.count, items: state.items};
}

export default connect(mapStateToProps)(Filter);