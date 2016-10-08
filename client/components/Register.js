import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
    let redirect = '/dashboard';
    this.state = { error: false, redirect };
  }

  signUp(e) {
    e.preventDefault();
    let email = this.refs.newEmail.value;
    let password = this.refs.newPassword.value;
    let school = this.refs.school.value;
    let year = this.refs.year.value;
    this.props.dispatch(signup(email, password, school, year, this.props.history, this.state.redirect));
  }

  render() {
    return(
      <div>
        <h2 className="center-align">Sign Up</h2>
          <form onSubmit={this.signUp} className="center-align">
            <input ref="newEmail" placeholder="email" />
            <input type="password" ref="newPassword" placeholder="password"/>
            <div className="input-field col s12">
              <select className="browser-default" ref="school">
                <option value="" disabled selected>Select a University</option>
                <option value="Utah State University">Utah State University</option>
                <option value="University of Utah">University of Utah</option>
                <option value="Southern Utah University">Southern Utah University</option>
                <option value="Weber State University">Weber State University</option>
                <option value="Utah Valley University">Utah Valley University</option>
                <option value="Dixie State University">Dixie State University</option>
                <option value="Brigham Young University">Brigham Young University</option>
              </select>
            </div>
            <input ref="year" placeholder="Graduation Year" />
            <br />
            <button className="btn blue-grey" type="submit">Register</button>
          </form>
      </div>
    );
  }
}

export default connect()(Register);
