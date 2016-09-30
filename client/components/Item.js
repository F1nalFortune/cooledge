import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.addOffer = this.addOffer.bind(this);
    this.state = { item: {}, offers: [] };
  }

  componentWillMount() {
    $.ajax({
      url: `/api/items/${this.props.params.id}`,
      type: 'GET'
    }).done( (item) => {
      this.setState({ item });
      console.log('hello got the item');
    });

    $.ajax({
      url: `/api/items/${this.props.params.id}/offers`,
      type: 'GET'
    }).done( offers => {
      this.setState({ offers });
      console.log('hello got the offer');
    })
  }

  addOffer(e) {
    e.preventDefault();
    var itemId = this.props.params.id;
    $.ajax({
      url: `/api/items/${itemId}/offers`,
      type: 'POST',
      data: {
        name: this.refs.name.value,
        offer: this.refs.offer.value,
        itemId: itemId
      }
    }).done( (offer) => {
      this.refs.form.reset();
      this.setState({ offers: [ { ...offer }, ...this.state.offers ]});
    }).fail( (err) => {
      console.log("Add offer to item failed, message from Item.js component.");
      console.log(err);
    });
  }

  deleteOffer(id) {
    this.setState({
      offers: this.state.offers.filter( c => c._id !== id)
    });

    $.ajax({
      url: `/api/items/offers/${id}`,
      type: 'DELETE'
    }).fail( () => {
      alert('Item failed to delete');
      this.getItems();
    });
  }

  render() {
    let { name, category, condition, description } = this.state.item;
    let offers = this.state.offers.map( offer => {
      return (
        <div className="row">
          <Link to={`/offers/${offer._id}`} key={offer._id} className="collection-item">
            {offer.name}
          </Link>
          <button className="btn red" onClick={() => this.deleteOffer(offer._id)}>
            Delete
          </button>
        {/* <li className="collection-item" key={offer._id}>{offer.name}</li> */}
        </div>
      )
    })
    return (
        <div className="container">
          <h4>Name: {name}</h4>
          <h5>{description}</h5>
          <h5>{category}</h5>
          <h5>{condition}</h5>
          <hr />
          <div className="row">
            <div className="col s8 m9">
              <ul className="collection">
                {offers}
              </ul>
            </div>
            <div className="col s4 m3">
              <h3>Add Offer</h3>
              <form ref="form" onSubmit={this.addOffer}>
                <input ref="name" placeholder="name" />
                <textarea ref="offer" placeholder="offer"></textarea>
                <button className="btn" type="submit">Add Offer</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
}


export default Item;
