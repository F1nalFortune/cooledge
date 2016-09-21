import React from 'react';
import $ from 'jquery';

class User extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { user: {} };
  // }

  // componentWillMount() {
  //   $.ajax({
  //     url: `/api/users/${this.props.params.id}`,
  //     type: 'GET'
  //   }).done( (user) => {
  //     this.setState({ user });
  //   });
  // }

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
