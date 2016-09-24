import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.addOffer = this.addOffer.bind(this);
    this.state = { item: {}, assignments: [] };
  }

  componentWillMount() {
    $.ajax({
      url: `/api/items/${this.props.params.id}`,
      type: 'GET'
    }).done( (item) => {
      this.setState({ item });
    });

    $.ajax({
      url: `/api/items/${this.props.params.id}/assignments`,
      type: 'GET'
    }).done( assignments => {
      this.setState({ assignments })
    })
  }

  addOffer(e) {
    e.preventDefault();
    $.ajax({
      url: `/api/items/${this.props.params.id}/assignments`,
      type: 'POST',
      data: {
        name: this.refs.name.value,
        directions: this.refs.directions.value,
      }
    }).done( (assignment) => {
      this.refs.form.reset();
      this.setState({ assignments: [ { ...assignment }, ...this.state.assignments ]});
    });
  }

  deleteOffer(id) {
    this.setState({
      assignments: this.state.assignments.filter( c => c._id !== id)
    });

    $.ajax({
      url: `/api/items/assignments/${id}`,
      type: 'DELETE'
    }).fail( () => {
      alert('Item failed to delete');
      this.getItems();
    });
  }

  render() {
    let { title, teacher, date } = this.state.item;
    let assignments = this.state.assignments.map( assignment => {
      return (
        <div className="row">
          <Link to={`/assignments/${assignment._id}`} key={assignment._id} className="collection-item">
            {assignment.name}
          </Link>
          <button className="btn red" onClick={() => this.deleteOffer(assignment._id)}>
            Delete
          </button>
        </div>
        /* <li className="collection-item" key={assignment._id}>{assignment.name}</li> */
      )
    })
    return (
        <div className="container">
          <h4>{title}</h4>
          <h5>{teacher}</h5>
          <h5>{date}</h5>
          <hr />
          <div className="row">
            <div className="col m6">
              <h3>Add Offer</h3>
            </div>
            <div className="col m6">
              <form ref="form" onSubmit={this.addOffer}>
                <input ref="name" placeholder="name" />
                <textarea ref="directions" placeholder="directions"></textarea>
                <button className="btn" type="submit">Add Offer</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col m12">
              <ul className="collection">
                {assignments}
              </ul>
            </div>
          </div>
        </div>
      );
    }
}


export default Item;
