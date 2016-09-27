import React from 'react';
import ItemForm from './ItemForm';
import Items from './Items';
import { Link } from 'react-router';
import Filter from './Filter';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	let id = this.props.auth.id;
    return (
    	<div>
				<div>
					<h2>Welcome to your Dashboard</h2>
					<Link to={`/dashboard/${id}`} >User</Link>
				</div>
	      <div>
        <Items />
        <Filter />
	      </div>
	    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Dashboard);
