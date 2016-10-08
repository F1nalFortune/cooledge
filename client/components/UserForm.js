import React, { PropTypes } from 'react';
import $ from 'jquery';
import ProfileUpload from './ProfileUpload';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateUrl = this.updateUrl.bind(this);
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

  updateUserForm(url) {
    let image = url.length ? url : this.props.user.url
    $.ajax({
      url: `/api/users/${this.props.user._id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { url: image, school: this.refs.school.value, year: this.refs.year.value, general: this.refs.general.value }

    }).done( user => {
      console.log(user);
      this.props.updateUser();
      this.toggleEdit();
    });
  }

  updateUrl(id, url) {
    this.props.updateUrl(id, url);
  }

  userInfo() {
    return(
        <div>
          <div className="col s12 m6 user-info">
            <div><span className="thirty">School:</span>{this.props.user.school}</div>
            <div><span className="thirty">Graduating Year:</span>{this.props.user.year}</div>
            <div><span className="thirty">General:</span>{this.props.user.general}</div>
          </div>
          <div className="col m2 center">
            <button className="btn blue-grey" onClick={this.toggleEdit}>Edit</button>
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
              <select required={true} className="browser-default" ref="school">
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
              <h5 className="profile-text"> General Information</h5>
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
          <div className="col s12 m4">
            <ProfileUpload updateUserForm={this.updateUserForm} updateUserUrl={this.updateUrl} id={this.props.user._id} />
          </div>
        </div>
        <div className="col m2 center">
          <button className="btn blue-grey" onClick={this.toggleEdit}>Cancel</button>
          <button onClick={this.updateUserForm  } className="btn blue-grey">Update</button>
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
