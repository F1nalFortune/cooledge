import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions';


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
    window.jQuery('.button-collapse').sideNav();
  }

  links() {
    if (this.props.auth.isAuthenticated) {
      return (
        <div>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><a onClick={() => this.props.dispatch(logout())}>Logout</a></li>
        </div>
      )
    } else {
      return (
        <div>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </div>
        );
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper blue-grey darken-2">
            <a href="/" className="brand-logo">Coollege</a>
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
       </div>
     )
  }
}

const mapStateToProps = (state) => {
 return { auth: state.auth };
}

export default connect(mapStateToProps)(App);

