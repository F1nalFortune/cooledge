import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions';

class register extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <h2>Sign Up</h2>
          <form onSubmit={this.register}>
            <input ref="newEmail" placeholder="email" />
            <input type="password" ref="newPassword" placeholder="password"/>
            <input ref="year" placeholder="year" />
            <input ref="age" placeholder="age" />
            <input ref="gender" placeholder="gender" />
            <br />
            <button className="btn" type="submit">Register</button>
          </form>
      </div>
    );
  }
}

export default register;
