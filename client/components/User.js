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
    let items = this.state.items.map( (item) => {
      return (
        <div>
          <div className="col s6 m3">
            <div className="card">
              <div className="card-image">
                <Upload updateItemUrl={this.updateItemUrl} id={item._id} />
                <img width="500px" src={item.url} />
              </div>
              <span className="card-title">{item.name}</span>
              <div className="card-content">
                <p>{item.description}</p>
              </div>
              <div className="card-action">
                <Link to={`/items/${item._id}`} key={item._id} className="collection-item">
                  Offers
                </Link>
                <button className="btn red" onClick={() => this.deleteItem(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
    <div>
      <div className="row">
        <div className="col s12 m4">
          <h3>{this.state.users.username}</h3>
          <img width="250px" src={this.state.users.url}/>
          <ProfileUpload updateUserUrl={this.updateUserUrl} id={this.state.users._id} />
        </div>
        <div className="col s12 m8">
          <span>{this.state.users.school}</span>
          <span>{this.state.users.year}</span>
          <span>{this.state.users.age}</span>
        </div>
      </div>
      <div className="row">
        <ItemForm
          showItemForm={this.state.showItemForm}
          addItem={this.addItem} />
        {items}
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
