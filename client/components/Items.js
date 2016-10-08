import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchItems, searchItems } from '../actions';
import Upload from './Upload';
import Filter from './Filter';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.updateItemUrl = this.updateItemUrl.bind(this)
    this.form = this.form.bind(this);
    this.state = { items: [], showForm: false, userSchool: [] };
  }

  componentWillMount() {
    this.props.dispatch(fetchItems());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      switch(nextProps.filter) {
        case 'SHOW_ALL':
          return this.props.items;
        default:
          let items = this.setState({ items: this.props.items.filter( item => item.category === nextProps.filter)})
      }
    } 
  }

  updateItemUrl(id, url) {
    let items = this.state.items.map( item => {
      if (item._id !== id) 
        return item;
      return {
        ...item,
        url
      }
    });

    this.setState({ items });
    this.props.dispatch(fetchItems());

  }

  addItem(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/items',
      type: 'POST',
      data: {
        name: this.refs.name.value,
        description: this.refs.description.value,
        category: this.refs.category.value,
        condition: this.refs.condition.value,
        userId: this.props.auth.id,
        needed: this.refs.needed.value
      }
    }).done( (item) => {
      this.refs.form.reset();
      this.setState({ items: [ { ...item }, ...this.state.items ]});
      this.props.dispatch(fetchItems())
    });
  }

  toggleForm(e){
    e.preventDefault();
    this.setState({ showForm: !this.state.showForm })
  }

  form() {
    if (this.state.showForm) { 
      return (
        <div>
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
            <button className="btn blue-grey"type="submit">Add</button>
          </form>
        </div> 
      )
    } else {
      return null
    }
  }

  deleteItem(id) {
    this.setState({
      items: this.state.items.filter( i => i._id !== id)
    });

    $.ajax({
      url: `/api/items/${id}`,
      type: 'DELETE'
    }).done( () => {
      Materialize.toast('Item Deleted', 2000);
      this.props.dispatch(fetchItems())
    }).fail( () => {
      alert('Item failed to delete');
    });
  }


  render() {
    let itemArr = this.props.filter === 'SHOW_ALL' ? this.props.items : this.state.items;
    let items = itemArr.map( (item) => {
      return (
      <div className="col s10 m4 item-list-div">
        <Link to={`/items/${item._id}`} key={item._id} >
          <img height="250 px" width="375 px" src={item.url} />
        </Link>
        <Upload updateItemUrl={this.updateItemUrl} id={item._id} />
      </div>
      );
    });

    return (
      <div>
        <div className="row item-filter-div">
          <div className="col s12 m2 filter-div">
            <Filter />
          </div>
          <div className="col s10 m10">
            <ul>
              {items}
            </ul>
            <br />
          </div>
          <ul className="pagination center">
            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            <li className="active"><a href="#!">1</a></li>
            <li className="waves-effect"><a href="#!">2</a></li>
            <li className="waves-effect"><a href="#!">3</a></li>
            <li className="waves-effect"><a href="#!">4</a></li>
            <li className="waves-effect"><a href="#!">5</a></li>
            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
          </ul>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
 return { auth: state.auth, filter: state.filter, items: state.items, userSchool: state.school };
}

export default connect(mapStateToProps)(Items);
