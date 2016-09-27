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
    });

    // $.ajax({
    //   url: `/api/items/${this.props.params.id}/offers`,
    //   type: 'GET'
    // }).done( offers => {
    //   this.setState({ offers })
    // })
  }

  addOffer(e) {
    e.preventDefault();
    $.ajax({
      url: `/api/items/${this.props.params.id}/offers`,
      type: 'POST',
      data: {
        name: this.refs.name.value,
        category: this.refs.category.value,
        condition: this.refs.condition.value
      }
    }).done( (offer) => {
      this.refs.form.reset();
      this.setState({ offers: [ { ...offer }, ...this.state.offers ]});
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
    let { title, teacher, date } = this.state.item;
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
          <h4>{title}</h4>
          <h5>{teacher}</h5>
          <h5>{date}</h5>
          <hr />
          <div className="row">
            <div className="col m6">
              <h3>Add Offer</h3>
            </div>
            <div className="col m6">
              <form ref="form" onSubmit={this.addOffer}>
                <input ref="name" placeholder="name" />
                <textarea ref="directions" placeholder="directions"></textarea>
                <button className="btn" type="submit">Add Offer</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col m12">
              <ul className="collection">
                {offers}
              </ul>
            </div>
          </div>
        </div>
      );
    }
}


export default Item;
