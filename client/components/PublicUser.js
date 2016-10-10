import React from 'react';
import $ from 'jquery';
import Items from './Items';
import ItemForm from './ItemForm';
import App from '../containers/App';
import { Link } from 'react-router';
import Upload from './Upload';
import ProfileUpload from './ProfileUpload';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';
import UserForm from './UserForm';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    this.state = { users: [], items: [], showItemForm: false, showUpload: false};
  }

  componentWillMount() {
    this.props.dispatch(fetchItems());
    this.getUser();
  }

  getUser(){
    let id = this.props.auth.id
    $.ajax({
      url: `/api/users/${id}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( res => {
      let { users, items } = res;
      this.setState({ users, items });
    }).fail( msg => {
      console.log(msg)
    });
   }


  render() {
    let availableItems = this.state.items.map( (item) => {
      console.log(!item.needed);
      if (!item.needed) {
        return (
           <li>
            <div className="collapsible-header blue-grey darken-2 white-text"><i className="material-icons">check_box</i>{item.name} - - {item.condition}</div>
             <div className="collapsible-body">
                <div className="row">
                  <div className="col s12 m12">
                  <Link to={`/items/${item._id}`} key={item._id} className="collection-item">
                    <h3>
                      {item.name}
                    </h3>
                  </Link>
                    <h4>
                      {item.description}
                    </h4>
                  </div>
                  <div className="center">
                    <img width="600px" src={item.url ? item.url : {} } />
                  </div>
                </div>
              </div>
            </li>
        );
      }
    });

    let wantedItems = this.state.items.map( (item) => {
      if (item.needed) {
        return (
            <li>
            <div className="collapsible-header blue-grey darken-2 white-text"><i className="material-icons">check_box_outline_blank</i>{item.name} - - {item.condition}</div>
             <div className="collapsible-body">
                <div className="row">
                  <div className="col s12 m12">
                    <Link to={`/items/${item._id}`} key={item._id} className="collection-item">
                    <h3>
                      {item.name}
                    </h3>
                    </Link>
                    <h4>
                      {item.description}
                    </h4>
                  </div>
                  <div className="center">
                    <img width="600px" src={item.url ? item.url : {} } />
                  </div>
                </div>
              </div>
            </li>
        );
      }
    });

    return (

    <div>
      <div className="row bck">
        <div className="container toppad">
          <div className="row">
            <div className="col s12 m4">
              <img height="200px" src={this.state.users.url}/>
              <h5 className="profile-text">{this.state.users.name}</h5>  
              
        </div>
      </div>
      <div className="row user-body">
        <div className="col s6 m6">
          <h3 className="center">Items available</h3>
          <ul className="collapsible" data-collapsible="accordion">
            {availableItems}
          </ul>
        </div>
        <div className="col s6 m6">
          <h3 className="center">Items Needed</h3>
           <ul className="collapsible" data-collapsible="accordion">
            {wantedItems}
          </ul>
        </div>
      </div>
      <hr/>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, items: state.items };
}

export default connect(mapStateToProps)(User);