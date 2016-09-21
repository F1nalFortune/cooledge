import React from 'react';
import $ 'jquery';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentWillMount() {
    $.ajax({
      url: `/api/users/${this.props.params.id}`,
      type: 'GET'
    }).done( (user) => {
      this.setState({ user });
    });
  }

  render() {
    let { name, school, items }
    return (
      <div className="container">
        <h3>{name}</h3>
        <h3>{school}</h3>
        <h3>{items}</h3>
      </div>
    );
  }
}

export default User;
