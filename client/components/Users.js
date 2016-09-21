import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.newUser = this.newUser.bind(this);
    this.state = { users: [] };
  }

  componentWillMount() {
    $.ajax({
      url: '/api/users',
      type: 'GET',
    }).done( (users) => {
      this.setState({ users });
    });
  }

  render() {
    let users = this.state.users.map( (user) => {
      return (
        <Link
          to={`/users/${user._id}`}
          key={user._id}
          className"collection-item"
        >
          {`${user.first_name} ${user.last_name}`}
        </Link>
      );
    });

    return (
        <ul className="collection">
          { users }
        </ul>
      );
    }
  }

export default Users;
