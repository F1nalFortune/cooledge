import React from 'react';
import ItemForm from './ItemForm';
import Items from './Items';
import { Link } from 'react-router';
import Filter from './Filter';
import { connect } from 'react-redux';
import { searchItems } from '../actions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search() {
    this.props.dispatch(searchItems(this.refs.searchForms.value));
  }

  render() {
  let id = this.props.auth.id;
    return (
    <div>
      <div className="row dashboard-bg">
        <div className="col s2 m2">
          <Link className="btn blue-grey" to={`/dashboard/${id}`} >User</Link>
        </div>
        <div className="col s10 m10">
          <h2 className="sitefont center dashboard-greeting">Welcome to your Dashboard</h2>
        </div>
          <div className="col m2 offset-m5 search-row">
            <div className="top-bar">
              <div className="search-container">
                <form ref="searchForm" 
                  onChange={(e) => {
                    e.preventDefault()
                    this.search()
                  }}>
                  <input className="search input-field" ref="searchForms" type="search" placeholder="Search" />
                </form>
              </div>
            </div>
          </div>
          <div className="btn-floating center-align">
            <span><i className="material-icons">search</i></span>
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
  return { auth: state.auth, items: state.items };
}

export default connect(mapStateToProps)(Dashboard);
