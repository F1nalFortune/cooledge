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
    let school = this.refs.school.value;
    let year = this.refs.year.value;
    let age = this.refs.age.value;
    let general = this.refs.general.value;
    $.ajax({
      url: `/api/users/${this.props.user.id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { school, year, age, general }
    }).done( userform => {
      this.props.updateUserForm(user._id, school, year, age, general);
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
            <a onClick={this.toggleEdit}>
              <img 
                width="20%" 
                  src='http://niceclipart.com/wp-content/uploads/2016/09/Pencil-clipart.png'/>
            </a>
            <p> Edit Profile Button </p>
          </div>
        </div>
    );
  }

  edit() {
    let school = this.props.user.school;
    let year = this.props.user.year;
    let age = this.props.user.age;
    let general = this.props.user.general;
    return (
      <div>
        <div className="col s12 m6 user-info">
          <input
            required={true}
            ref="school"
            placeholder={school}
            defaultValue={school}
          />
          <input
            required={true}
            ref="year"
            placeholder={year}
            defaultValue={year}
          />
          <input
            required={true}
            ref="age"
            placeholder={age}
            defaultValue={age}
          />
          <textarea ref="general">{general}</textarea> 
          {/* <div>School:{this.state.users.school}</div> 
          <div>Graduating Year:{this.state.users.year}</div>
          <div>Age: {this.state.users.age}</div>
          <div>General: </div>*/}
        </div>
        <div className="col m2 center">
          <a onClick={this.toggleEdit}>
            <img 
              width="20%" 
                src='http://niceclipart.com/wp-content/uploads/2016/09/Pencil-clipart.png'/>
          </a>
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
