import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';

let booleanValue = true;
class ItemForm extends React.Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this);
    this.state = { items: [] };
  }

  //  addItem(e) {
  //     e.preventDefault();
  //     let name = this.refs.name.value;
  //     let category = this.refs.category.value;
  //     let condition = this.refs.condition.value;
  //     this.refs.itemForm.reset();
  //     this.props.addSongItem(name, category, condition);
  //   }

   addItem(e) {
     e.preventDefault();
     if(this.refs.needed.value === 'true') {
      booleanValue = true;
     } else {
      booleanValue = false;
     }
     $.ajax({
       url: '/api/items',
       type: 'POST',
       data: {
        name: this.refs.name.value,
        category: this.refs.category.value,
        condition: this.refs.condition.value,
        userId: this.props.auth.id,
        needed: booleanValue
       }
     }).done( (item) => {
       this.refs.form.reset();
       this.props.addItem();
     });
   }

   deleteItem(id) {
     this.setState({
       items: this.state.items.filter( i => i._id !== id)
     });

     $.ajax({
       url: `/api/items/${id}`,
       type: 'DELETE'
     }).fail( () => {
       alert('Item failed to delete');
       this.getItems();
     });
   }
 // addItem(e) {
 //   e.preventDefault();
 //   $.ajax({
 //     url: '/api/items',
 //     type: 'POST',
 //     data: {
 //       name: this.refs.name.value,
 //       category: this.refs.category.value,
 //       condition: this.refs.condition.value
 //     }
 //   }).done( (item) => {
 //     this.refs.form.reset();
 //     this.setState({ items: [ { ...item }, ...this.state.items ]});
 //   });
 // }


  render() {

    return (
      <div>
        <div className="col s12 m12 add-form">
          <h2 className="sitefont profile-text">Add an Item</h2>
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
            <div className="input-field col s12">
              <select className="browser-default" ref="needed">
                <option value="" disabled selected>Item Status (Adding item to page / Requesting item)</option>
                <option value="true">Adding</option>
                <option value="false">Requesting</option>
              </select>
            </div>
            <input type="text" ref="condition" placeholder="Condition of Item" />
            <button className="btn" type="submit">Add</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, items: state.items };
}

export default connect(mapStateToProps)(ItemForm);
