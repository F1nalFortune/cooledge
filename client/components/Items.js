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
        <ul className="col s2 m4">
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
        <ul className="col s10 m8 collection">
          {items}
        </ul>
      </div>
    );
  }
}

export default Items;
