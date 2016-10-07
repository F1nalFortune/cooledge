import React from 'react';
import $ from 'jquery';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateUserForm = this.updateUserForm.bind(this);
    this.state = { edit: false };
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
    }).done( res => {
      console.log(res);
      this.toggleEdit();
    });
  }

  userInfo() {
    return(
        <div>
          <div className="col s12 m6 user-info">
            <div>School:{this.props.user.school}</div>
            <div>Graduating Year:{this.props.user.year}</div>
            <div>Age:{this.props.user.age}</div>
            <div>General:</div>
            <textarea></textarea>
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
            <select className="browser-default" ref="school">
              <option value="" disabled selected>Select a University</option>
              <option value="harvard">Harvard</option>
              <option value="uofu">University of Utah</option>
              <option value="yale">Yale</option>
            </select>
          </div>
          <input
            required={true}
            ref="year"
            placeholder={yr}
            defaultValue={yr}
          />
          <input
            required={true}
            ref="age"
            placeholder={ag}
            defaultValue={ag}
          />
          <textarea ref="general">{gen}</textarea> 
          {/* <div>School:{this.state.users.school}</div> 
          <div>Graduating Year:{this.state.users.year}</div>
          <div>Age: {this.state.users.age}</div>
          <div>General: </div>*/}
        </div>
        <div className="col m2 center">
          <button className="btn" onClick={this.toggleEdit}>Cancel</button>
          <button onClick={this.updateUserForm} className="btn">Update</button>
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
