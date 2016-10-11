import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';
import Upload from './Upload';

let booleanValue = true;
class ItemForm extends React.Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this);
    this.state = { items: [], upload: false, id: null };
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
      this.setState({ id: item._id, upload: true })
      this.props.getUser();
      this.refs.form.reset();
     });
   }



  render() {


    return (
      <div>
        <div className="col s12 m12">
          <h2 className="sitefonts center">Add an Item</h2>
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
                <option value="" disabled selected>Item Status ( Item Available for trade / Item That You Need )</option>
                <option value="false">Available</option>
                <option value="true">Needed</option>
              </select>
            </div>
            <input type="text" ref="condition" placeholder="Condition of Item" />
            <div className="center">
              <button className="btn btn-large waves-light blue-grey center" type="submit">Add Item</button>
            </div>
          </form>
          { this.state.upload ? 
            <div classNam="center">
              <Upload id={this.state.id} />
            </div> 
            : null 
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, items: state.items };
}

export default connect(mapStateToProps)(ItemForm);