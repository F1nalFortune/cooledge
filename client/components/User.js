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
    this.updateItemUrl = this.updateItemUrl.bind(this);
    this.updateUserUrl = this.updateUserUrl.bind(this);
    this.toggleItemForm = this.toggleItemForm.bind(this);
    this.getUser = this.getUser.bind(this);
    this.state = { users: [], items: [] };
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

  addItem = () => {
    $.ajax({
      url: '/api/items',
      type: 'GET'
    }).done( (items) => {
      this.setState({ items });
    }).fail(data => {
      console.log(data);
    });
  }

  updateItemUrl(id, url) {
    let items = this.state.items.map( item => {
      if (item._id !== id) 
        return item;
      return {
        ...item,
        url
      }
    });

    this.setState({ items });
    this.props.dispatch(fetchItems());
  }

  updateUserUrl(id, url) {
    let users = this.state.users.map( user => {
      if (user._id !== id) 
        return user;
      return {
        ...user,
        url
      }
    });

    this.setState({ users });
  }

  toggleItemForm() {
    let formState = (this.state.showItemForm === 'hidden') ? 'show' : 'hidden';
    this.setState({showItemForm: formState});
  }

  deleteItem(id) {
    this.setState({
      items: this.state.items.filter( i => i._id !== id)
    });

    $.ajax({
      url: `/api/items/${id}`,
      type: 'DELETE'
    }).done( () => {
      Materialize.toast('Item Deleted', 2000);
      this.props.dispatch(fetchItems())
    }).fail( () => {
      alert('Item failed to delete');
    });
  }

  render() {
    let availableItems = this.state.items.map( (item) => {
      console.log(!item.needed);
      if (!item.needed) {
        return (
           <li>
             <div className="collapsible-header">{item.name} - - {item.condition}</div>
             <div className="collapsible-body">
               <div className="row">
                 <div className="col s12 m12">
                    <Upload updateItemUrl={this.updateItemUrl} id={item._id} />
                    <img width="500px" src={item.url ? item.url : {} } />
                  </div>
                  <div className="col s12 m12">
                    <h4>
                      {item.description}
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col s6 m6">
                    <Link to={`/items/${item._id}`} key={item._id} className="collection-item">
                      Offers
                    </Link>
                  </div>
                  <div className="col s6 m6">
                    <button className="btn red" onClick={() => this.deleteItem(item._id)}>
                      Delete
                    </button>
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
             <div className="collapsible-header">{item.name} - - {item.condition}</div>
             <div className="collapsible-body">
               <div className="row">
                 <div className="col s6 m6">
                    <Upload updateItemUrl={this.updateItemUrl} id={item._id} />
                    <img width="500px" src={item.url ? item.url : {} } />
                  </div>
                  <div className="col s6 m6">
                    <h4>
                      {item.description}
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col s3 m3 offset-m3 offset-s3">
                    <Link to={`/items/${item._id}`} key={item._id} className="collection-item">
                      Offers
                    </Link>
                  </div>
                  <div className="col s3 m3">
                    <button className="btn red" onClick={() => this.deleteItem(item._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
        );
      }
    });

    return (

    <div className="bck">
      <div className="container toppad">
        <div className="row">
          <div className="col s12 m4">
            <img width="250px" src={this.state.users.url}/>
            <h5 className="profile-text">{this.state.users.username}</h5>  
          </div>

          <UserForm user={this.state.users} updateUser={this.getUser} updateUrl={this.updateUserUrl}/>

        </div>
      </div>
      <div className="row">
        <div className="col s12 m12">
          <ItemForm
            className="add-form"
            getUser={this.getUser}
            showItemForm={this.state.showItemForm}
            addItem={this.addItem} />
        </div>
        <div className="col s6 m6">
          <h3 className="profile-text center">Items available</h3>
          <ul className="collapsible" data-collapsible="accordion">
            {availableItems}
          </ul>
        </div>
        <div className="col s6 m6">
          <h3 className="profile-text center">Items Needed</h3>
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