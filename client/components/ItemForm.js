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
        condition: this.refs.condition.value,
        category: this.refs.category.value,
        description: this.refs.description.value,
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



  render() {


    return (
      <div>
        <div className="col s12 m12 add-form">
          <h2 className="sitefont profile-text">Add an Item</h2>
          <form className="white-text" ref="form" onSubmit={(e) => this.addItem(e)}>
            <input type="text" ref="name" placeholder="Item Name" className="white-text" />
            <input rows="6" type="text" ref="description" placeholder="Item Description" />
            <div className="input-field col s12 black-text">
              <select className="browser-default" ref="category">
                <option value="" disabled selected>Select a Category</option>
                <option value="school">School Supplies</option>
                <option value="dorm">Dorm Supplies</option>
                <option value="electronics">Computers and Electronics</option>
              </select>
            </div>
            <div className="input-field col s12 black-text">
              <select className="browser-default" ref="needed">
                <option value="" disabled selected>Item Status ( Item Available / Item Needed )</option>
                <option value="true">Available</option>
                <option value="false">Needed</option>
              </select>
            </div>
            <input type="text" ref="condition" placeholder="Condition of Item" />
            <button data-target="modal1" className="btn blue-grey modal-trigger" type="submit">Add</button>
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