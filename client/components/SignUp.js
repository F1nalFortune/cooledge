import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions';

class SignUp extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <h2>Sign Up</h2>
          <form onSubmit={this.signUp}>
            <input ref="newEmail" placeholder="email" />
            <input type="password" ref="newPassword" placeholder="password"/>
            <br />
            <button className="btn" type="submit">Sign Up</button>
          </form>
      </div>
    );
  }
}

export default SignUp;
