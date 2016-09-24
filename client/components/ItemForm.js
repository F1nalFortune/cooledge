import React from 'react';

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
        <div>
          <h2>Add an Item</h2>
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
            <button className="btn"type="submit">Add</button>
          </form>
        </div>
      </div>
    )
  }
}

export default ItemForm;
