import React from 'react';

class ItemForm extends React.Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this);
  }

   addItem(e) {
      e.preventDefault();
      let name = this.refs.name.value;
      let category = this.refs.category.value;
      let condition = this.refs.condition.value;
      this.refs.itemForm.reset();
      this.props.addSongItem(artist, song, comments);
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
      <div className={this.props.showItemForm}>
        <div className="container">
          <form ref="itemForm" onSubmit={this.addItem}>
            <input ref="name" placeholder="Name..." type="text" />
            <input ref="category" placeholder="Category..." type="text" />
            <input ref="condition" placeholder="Condition..." type="text" />
            <button className="right btn">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default ItemForm;
