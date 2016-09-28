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
      <div className="row">
        <div className="col s2 m2">
          <Link className="btn blue-grey" to={`/dashboard/${id}`} >User</Link>
        </div>
        <div className="col s10 m10">
          <h2 className="sitefont center">Welcome to your Dashboard</h2>
        </div>
      </div>
      <div>
        <Items />
	    </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Dashboard);
