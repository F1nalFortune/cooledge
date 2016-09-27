import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  signUp(e) {
    e.preventDefault();
    let email = this.refs.newEmail.value;
    let password = this.refs.newPassword.value;
    let school = this.refs.school.value;
    let year = this.refs.year.value;
    let age = this.refs.age.value;
    this.props.dispatch(signup(email, password, this.props.history, this.state.redirect));
  }

  render() {
    return(
      <div>
        <h2>Sign Up</h2>
          <form onSubmit={this.signUp}>
            <input ref="newEmail" placeholder="email" />
            <input type="password" ref="newPassword" placeholder="password"/>
            <div className="input-field col s12">
              <select className="browser-default" ref="school">
                <option value="" disabled selected>Select a University</option>
                <option value="harvard">Harvard</option>
                <option value="uofu">University of Utah</option>
                <option value="yale">Yale</option>
              </select>
            </div>
            <input ref="year" placeholder="year" />
            <input ref="age" placeholder="age" />
            <br />
            <button className="btn blue-grey" type="submit">Register</button>
          </form>
      </div>
    );
  }
}

export default Register;
