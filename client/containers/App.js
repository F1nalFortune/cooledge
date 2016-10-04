import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout, signin } from '../actions';
import Login from '../components/Login';
import Footer from '../components/Footer'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.links = this.links.bind(this);
  }

  componentWillMount() {
  if (!this.props.auth.isAuthenticated) {
    if (sessionStorage.userId && sessionStorage.token)
      this.props.dispatch({ type: 'LOGIN', id: sessionStorage.userId, token: sessionStorage.token });
   }
 }

  componentDidMount() {
    window.jQuery('.button-collapse').sideNav({
      closeOnClick: true
    });
  }

  links() {
    let id = this.props.auth.id;
    if (this.props.auth.isAuthenticated) {
      return (
        <div>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to={`/dashboard/${id}`}>Profile</Link></li>
          <li><a onClick={() => this.props.dispatch(logout())}>Logout</a></li>
        </div>
      )
    } else {
      return (
        <div>
          <li><Link to="/about">About</Link></li>
          <li><Login history={this.props.history} location={this.props.location}/></li>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="sitefont brand-logo">Trade Square</a>
            <a href="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              {this.links()}
            </ul>
            <ul className="side-nav" id="mobile">
              {this.links()}
            </ul>
          </div>
        </nav>
        {this.props.children}
        <Footer />
      </div>

     )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(App);
