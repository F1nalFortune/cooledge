import React from 'react';import $ from 'jquery';import Items from './Items';import ItemForm from './ItemForm';import App from '../containers/App';class User extends React.Component {  constructor(props) {    super(props);    this.addItem = this.addItem.bind(this);    this.toggleItemForm = this.toggleItemForm.bind(this);    this.state = { user: {}, items: [] };
  }  componentWillMount() {
    $.ajax({
      url: `/api/users/${this.props.params.id}`,
      type: 'GET'
    }).done( (res) => {
      let { user, items } = res;
      this.setState({ user, items });
    });
  }
  toggleItemForm() {    let formState = (this.state.showItemForm === 'hidden') ? 'show' : 'hidden';    this.setState({showItemForm: formState});  }  addItem(item) {
    this.setState({      items: [        item,
        ...this.state.items      ],    });  };  // let { name, school, items }  // <h3>{name}</h3>  // <h3>{school}</h3>  // <h3>{items}</h3>  render() {    let items = this.state.items.map( (item) => {
      return (
        <div className="col s8 m9">
          <ul>
            <li className="collection-item">
              {item.name}
            </li>
          </ul>
          <button className="btn red" onClick={() => this.deleteItem(item._id)}>
            Delete
          </button>
        </div>
      )
    })
    return (      <div className="row">
        User Component here        {/* <App          toggleItemForm={this.toggleItemForm}          showItemForm={this.state.showItemForm} /> */}        <ItemForm          showItemForm={this.state.showItemForm}          addItem={this.addItem}
        />
        {items}
        {/* list of items */}
      </div>    );  }}export default User;
