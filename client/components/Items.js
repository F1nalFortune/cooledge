import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.addItem = this.addItem.bind(this);
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
        category: this.refs.category.value,
        condition: this.refs.condition.value
      }
    }).done( (item) => {
      this.refs.form.reset();
      this.setState({ items: [ { ...item }, ...this.state.items ]});
    });
  }

  render() {
    let items = this.state.items.map( (item) => {
      return (
      <div className="row">
        <Link to={`/items/${item._id}`} key={item._id} className="collection-item">
          {item.name}
        </Link>
      </div>
      );
    });

    return (
      <div className="row">
        <form className="col m4" ref="form" onSubmit={this.addItem}>
          <input ref="name" placeholder="name" />
          <input ref="category" placeholder="category" />
          <input ref="condition" placeholder="condition" />
          <button className="btn" type="submit">Add Item</button>
        </form>
        <ul className="col m8 collection">
          {items}
        </ul>
      </div>
    );
  }
}

export default Items;
