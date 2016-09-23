import React from 'react';
import $ from 'jquery';
import Items from './Items';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.toggleItemForm = this.toggleItemForm.bind(this);
    this.state = { user: {} };
  }

  // componentWillMount() {
  //   $.ajax({
  //     url: `/api/users/${this.props.params.id}`,
  //     type: 'GET'
  //   }).done( (user) => {
  //     this.setState({ user });
  //   });
  // }

  toggleItemForm() {
    let formState = (this.state.showItemForm === 'hidden') ? 'show' : 'hidden';
    this.setState({showItemForm: formState});
  }

  addItem(name, category, condition) {
    let id = ++this.state.id;

    this.setState({
      items: [
        { name, category, condition, id },
        ...this.state.items
      ],
      id,
      showItemForm: "hidden"
    });
  };

  // let { name, school, items }
  // <h3>{name}</h3>
  // <h3>{school}</h3>
  // <h3>{items}</h3>
  render() {
    return (
      <div className="container">
        User Component here
      </div>
    );
  }
}

export default User;
