import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchItems } from '../actions';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.form = this.form.bind(this);
    this.state = { items: [], showForm: false };
  }

  componentWillMount() {
    $.ajax({
      url: '/api/items/',
      type: 'GET'
    }).done( (items) => {
      this.setState({ items });
    });
  }

  addItem(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/items',
      type: 'POST',
      data: {
        name: this.refs.name.value,
        description: this.refs.description.value,
        category: this.refs.category.value,
        condition: this.refs.condition.value,
        userId: this.props.auth.id
      }
    }).done( (item) => {
      this.refs.form.reset();
      this.setState({ items: [ { ...item }, ...this.state.items ]});
      this.props.dispatch(fetchItems())
    });
  }

  toggleForm(e){
    e.preventDefault();
    this.setState({ showForm: !this.state.showForm })
  }

  form() {
    if (this.state.showForm) { 
      return (
        <div>
          <form ref="form" onSubmit={(e) => this.addItem(e)}>
            <input type="text" ref="name" placeholder="Item Name" />
            <input rows="6" type="text" ref="description" placeholder="Item Description" />
            <div className="input-field col s12">
              <select className="browser-default" ref="category">
                <option value="" disabled selected>Select a Category</option>
                <option value="school">School Supplies</option>
                <option value="dorm">Dorm Supplies</option>
                <option value="electronics">Computers and Electronics</option>
              </select>
            </div>
            <input type="text" ref="condition" placeholder="Condition of Item" />
            <button className="btn blue-grey"type="submit">Add</button>
          </form>
        </div> 
      )
    } else {
      return null
    }
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
    }).fail( () => {
      alert('Item failed to delete');
    });
  }

  render() {
    let items = this.state.items.map( (item) => {
      return (
      <div className="row">
        <Link to={`/items/${item._id}`} key={item._id} className="collection-item">
          {item.name}
        </Link>
        <button className="btn red" onClick={() => this.deleteItem(item._id)}>
        Delete
        </button>
      </div>
      );
    });

    return (
      <div>

        <div className="row">
          <div className="col s2 m4">
            <div>
              <button id='toggle' className='btn blue-grey' onClick={this.toggleForm}>Add An Item</button>
              { this.form() }
            </div>
            <ul>
              <li>
                School Supplies
              </li>
                <ul className="supply">
                  <li>
                    Pens
                  </li>
                  <li>
                    Pencils
                  </li>
                  <li>
                    Notebooks
                  </li>
                </ul>
              <li>
                Dorm Supplies
              </li>
                <ul className="supply">
                  <li>
                    Posters
                  </li>
                  <li>
                    Tapestries
                  </li>
                  <li>
                    Camera
                  </li>
                </ul>
            </ul>
          </div>
          <div className="col s10 m8 collection">
            <ul>
              {items}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
 return { auth: state.auth };
}

export default connect(mapStateToProps)(Items);
