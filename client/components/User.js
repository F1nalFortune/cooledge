import React from 'react';
import $ from 'jquery';
import Items from './Items';
import ItemForm from './ItemForm';
import App from '../containers/App';

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
    <div>
      <button className="btn">Add Profile Picture</button>
      <div className="row">
        <div id="profile-space" className="col s6 m6">

        </div>
        <div id="profile-info" className="col s6 m6">

        </div>
      </div>
      <div className="row">
        User Component here
        <ItemForm
          showItemForm={this.state.showItemForm}
          addItem={this.addItem} />
        {items}
        {/* list of items */}
      </div>
      <hr/>
    </div>
    );
  }
}

export default User;
