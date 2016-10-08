import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setFilter, fetchItemCount, schoolItemFilter } from '../actions';
import Items from './Items';

class Filter extends React.Component {
	constructor(props) {
		super(props);
		this.schoolFilter = this.schoolFilter.bind(this);
	}	

	setFilter(category) {
	  this.props.dispatch(setFilter(category));
	}

	setItemCount(field){
		return this.props.items.filter( item => item.category === field).length
	}

	schoolFilter() {
		let university = this.refs.school.value;
		this.props.dispatch(schoolItemFilter(university));
	}

	render() {
		return (
			<div>
				<form ref="school-filter-form">
					<div className="input-field">
						<select ref='school' onChange={this.schoolFilter} className="browser-default transparent">
				      <option value="" disabled selected>Choose University</option>
				      <option value="harvard" >Harvard</option>
				      <option value="uofu" >University of Utah</option>
				      <option value="yale">Yale</option>
		    		</select>
		    	</div>
	    	</form>
				<div className="collection">
				  <a className="waves-effect collection-item transparent" onClick={() => this.setFilter('school')}>School Supplies<span className="badge blue-grey white-text">{this.setItemCount('school')}</span></a>
				  <a className="waves-effect collection-item transparent" onClick={() => this.setFilter('dorm')}>Dorm Supplies<span className="badge blue-grey white-text">{this.setItemCount('dorm')}</span></a>
				  <a className="waves-effect collection-item transparent" onClick={() => this.setFilter('SHOW_ALL')}>All<span className="badge blue-grey white-text">{this.props.items.length}</span></a>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
  return { filter: state.filter, count: state.count, items: state.items, userSchool: state.school};
}

export default connect(mapStateToProps)(Filter);