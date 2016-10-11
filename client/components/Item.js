import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.addOffer = this.addOffer.bind(this);
    this.addOfferForm = this.addOfferForm.bind(this);
    this.deleteOffer = this.deleteOffer.bind(this);
    this.itemsNeeded = this.itemsNeeded.bind(this);
    this.getOffer = this.getOffer.bind(this);
    this.state = { item: {}, items: [], offer: {}, user: {} };
  }

  componentWillMount() {
    $.ajax({
      url: `/api/items/${this.props.params.id}`,
      type: 'GET'
    }).done( (res) => {
      this.setState({item:res.item});
      this.setState({user:res.user});
      this.setState({items:res.items});
      this.getOffer();
    })
  }

  getOffer() {
    $.ajax({
      url: `/api/offers/${this.state.item._id}?userId=${this.state.user._id}`,
      type: 'GET'
      }).done( (offer) => {
        this.setState({offer});
    })
  }

  addOffer(e) {
    e.preventDefault();
    var itemId = this.props.params.id;
    $.ajax({
      url: '/api/offers',
      type: 'POST',
      data: {
        name: this.refs.name.value,
        contact: this.refs.contact.value,
        offer: this.refs.offer.value,
        itemId: itemId,
        userId: this.state.user._id
      }
    }).done( (offer) => {
      this.refs.form.reset();
      this.setState({offer});
      this.addOfferForm();
    }).fail( (err) => {
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

  itemsNeeded() {
    let arr = [];
    this.state.items.map( (item) => {
      if (!item.needed) {
        arr.push(
          <div className="panel-info">
            <h5 className="center-align">{item.name}</h5>
          </div> 
        )
      }
    })
    return arr;
  }

  addOfferForm() {
    if (this.state.offer.hasOwnProperty("_id")) {
      return(
        <div className="col s12 m4">
          <h4 className="center-align">Your offer is</h4>
          <div className="center-align panel-info">
            <p>{this.state.offer.offer}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="col s12 m4">
          <h4 className="center-align">Add Offer</h4>
          <form className="panel-info panel-padding-5" ref="form" onSubmit={this.addOffer}>
            <input ref="name" placeholder="name" />
            <input ref="contact" placeholder="Contact Info" />
            <textarea ref="offer" placeholder="offer"></textarea>
            <button className="btn blue-grey" type="submit">Add Offer</button>
          </form>
        </div>
      )
    }
  }


  render() {
    let { name, category, condition, description, url, needed } = this.state.item;
    return (
        <div>
          <div className="row item-desc-bg">
            <div className="col s12 offset-m2 m3 img-div">
              <img className="z-depth-3" height="250px" width="335px" src={url} />
            </div>
            <div className="col s12 m6 item-info-div panel-info">
              <h4>Name: {name}</h4>
              <h5>{description}</h5>
              <h5>Condition {condition}</h5>
            </div>
          </div>
          <div className="col s12 m12 border-div"></div>
          <div className="row add-offer-bg">
            <Link to='/dashboard/public/{this.state.user._id}'>
              <div className="col s12 m3 usr-info-div">
                <h4 className="center-align">Contact Info</h4>
                <div className="panel-info">
                  <img width="100%" src={this.state.user.url}/>
                  <h5 className="center-align">Contact Email: {this.state.user.username}</h5>
                  <h5 className="center-align">School: {this.state.user.school}</h5>
                </div>
              </div>
            </Link>
            <div className="col s12 m5">
              <h4 className="center-align">Items Request for Trading</h4>
              {this.itemsNeeded()}
            </div>
            {this.addOfferForm()}
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, items: state.items };
}


export default connect(mapStateToProps)(Item);
