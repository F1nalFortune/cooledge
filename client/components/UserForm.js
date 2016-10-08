import React, { PropTypes } from 'react';
import $ from 'jquery';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateUserForm = this.updateUserForm.bind(this);
    this.state = { edit: false };
  }

  static propTypes = {
    updateUser: PropTypes.func
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  updateUserForm() {
    $.ajax({
      url: `/api/users/${this.props.user._id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { school: this.refs.school.value, year: this.refs.year.value, age: this.refs.age.value, general: this.refs.general.value }
    }).done( user => {
      console.log(user);
      this.props.updateUser();
      this.toggleEdit();
    });
  }

  userInfo() {
    return(
        <div>
          <div className="col s12 m6 user-info">
            <div><span className="thirty">School:</span>{this.props.user.school}</div>
            <div><span className="thirty">Graduating Year:</span>{this.props.user.year}</div>
            <div><span className="thirty">Age:</span>{this.props.user.age}</div>
            <div><span className="thirty">General:</span>{this.props.user.general}</div>
          </div>
          <div className="col m2 center">
            <button className="btn" onClick={this.toggleEdit}>Edit</button>
          </div>
        </div>
    );
  }

  edit() {
    let sch = this.props.user.school;
    let yr = this.props.user.year;
    let ag = this.props.user.age;
    let gen = this.props.user.general;
    return (
      <div>
        <div className="col s12 m6">
          <div className="input-field col s12">
            <select className="browser-default" ref="school" defaultValue="Select">
              <option value="" >Select a University</option>
              <option value="harvard">Harvard</option>
              <option value="uofu">University of Utah</option>
              <option value="yale">Yale</option>
            </select>
         {/*    Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.
            Use the `defaultValue` or `value` props instead of setting children on <textarea>.*/}
          </div>
          <div className="row">
            <div className="col s6 m6">
              <h5 className="profile-text">Graduating Year</h5>
            </div>
            <div className="col s6 m6">
              <input
                required={true}
                ref="year"
                placeholder={yr}
                defaultValue={yr}
                className="white-text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col s4 m4">
              <h5 className="profile-text"> Age </h5>
            </div>
            <div className="col s8 m8">
              <input
                required={true}
                ref="age"
                placeholder={ag}
                defaultValue={ag}
                className="white-text"
              />
            </div>
          </div>
          <div className="row">
            <div className="col s4 m4">
              <h5 className="profile-text"> General Info. </h5>
            </div>
            <div className="col s8 m8">
              <input 
                ref="general" 
                required={true}
                placeholder={gen}
                defaultvalue={gen}
                className="white-text" /> 
            </div>
          </div>
          {/* <div>School:{this.state.users.school}</div> 
          <div>Graduating Year:{this.state.users.year}</div>
          <div>Age: {this.state.users.age}</div>
          <div>General: </div>*/}
        </div>
        <div className="col m2 center">
          <button className="btn" onClick={this.toggleEdit}>Cancel</button>
          <button onClick={this.updateUserForm  } className="btn">Update</button>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.edit)
      return this.edit();
    else
      return this.userInfo();
  }

}

export default UserForm;
