import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.addOffer = this.addOffer.bind(this);
    this.usrProfile = this.usrProfile.bind(this);
    this.state = { item: {}, offers: [], users: {} };
  }

  componentWillMount() {
    $.ajax({
      url: `/api/items/${this.props.params.id}`,
      type: 'GET'
    }).done( (item) => {
      this.setState({ item });
      console.log('hello got the item');
    }).fail(data => {
      console.log(data.responseText);
    })
    this.usrProfile();
  }

  addOffer(e) {
    e.preventDefault();
    var itemId = this.props.params.id;
    $.ajax({
      url: `/api/items/${itemId}/offers`,
      type: 'POST',
      data: {
        name: this.refs.name.value,
        contact: this.refs.contact.value,
        offer: this.refs.offer.value,
        itemId: itemId
      }
    }).done( (offer) => {
      this.refs.form.reset();
      this.setState({ offers: [ { ...offer }, ...this.state.offers ]});
    }).fail( (err) => {
      console.log("Add offer to item failed, message from Item.js component.");
      console.log(err.responseText);
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

  usrProfile() {
    let id = this.props.auth.id
    $.ajax({
      url: `/api/users/${id}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( res => {
      let { users } = res;
      this.setState({ users });
    }).fail( msg => {
      console.log(msg)
    });
  }

  render() {
    let { name, category, condition, description, url, needed } = this.state.item;
    let offers = this.state.offers.map( offer => {
      return (
        <div className="col s12 m4">
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
        <div>
          <div className="row item-desc-bg">
            <div className="col s12 offset-m3 m3 img-div">
              <img className="z-depth-3" height="260px" src={url} />
            </div>
            <div className="col s12 m4 item-info-div">
              <h4>Name: {name}</h4>
              <h5>{description}</h5>
              <h5>{category}</h5>
              <h5>{condition}</h5>
            </div>
          </div>
          <div className="col s12 m12 border-div">
          </div>
          <div className="row add-offer-bg">
            <div className="col s12 m4">
              <img height="200px" src={this.state.users.url}/>
              <p>Contact Email: {this.state.users.username}</p>
              <p>School: {this.state.users.school}</p>
            </div>
            <div className="col s12 m4">
              <p>{needed}</p>
            </div>
            <div className="col s12 m4">
              <h3>Add Offer</h3>
              <form ref="form" onSubmit={this.addOffer}>
                <input ref="name" placeholder="name" />
                <input ref="contact" placeholder="Contact Info" />
                <textarea ref="offer" placeholder="offer"></textarea>
                <button className="btn blue-grey" type="submit">Add Offer</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}


export default connect(mapStateToProps)(Item);
