import React from 'react';
import $ from 'jquery';
import Items from './Items';
import ItemForm from './ItemForm';
import App from '../containers/App';
import { Link } from 'react-router';
import Upload from './Upload';
import { connect } from 'react-redux';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.toggleItemForm = this.toggleItemForm.bind(this);
    this.getItems = this.getItems.bind(this);
    this.state = { user: {}, items: [] };
  }

  componentWillMount() {
    this.getItems();
  }

  getItems() {
    $.ajax({
      url: `/api/users/${this.props.params.id}`,
      type: 'GET'
    }).done( (res) => {
      let { user, items } = res;
      this.setState({ user, items });
    });
  }

  toggleItemForm() {
    let formState = (this.state.showItemForm === 'hidden') ? 'show' : 'hidden';
    this.setState({showItemForm: formState});
  }

  deleteItem(id) {
    // this.setState({
    //   items: this.state.items.filter( i => i._id !== id)
    // });

    $.ajax({
      url: `/api/items/${id}`,
      type: 'DELETE'
    }).done( () => {
      Materialize.toast('Item Deleted', 2000);
      // this.props.dispatch(fetchItems());
      this.getItems();
    }).fail( () => {
      alert('Item failed to delete');
    });
  }

  addItem(item) {
    this.setState({
      items: [
        item,
        ...this.state.items
      ],
    });
  };

  // let { name, school, items }
  // <h3>{name}</h3>
  // <h3>{school}</h3>
  // <h3>{items}</h3>



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
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
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
        User Component here
        {/* <App
          toggleItemForm={this.toggleItemForm}
          showItemForm={this.state.showItemForm} /> */}
        <ItemForm
          showItemForm={this.state.showItemForm}
          addItem={this.addItem}
        />
        {items}
        {/* list of items */}
      </div>
      <hr/>
      <button className="btn">Add Profile Picture</button>
      <div className="row">
        <div id="profile-space" className="col s6 m6">

        </div>
        <div id="profile-info" className="col s6 m6">

        </div>
      </div>
    </div>

    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, items: state.items };
}

export default connect(mapStateToProps)(User);
