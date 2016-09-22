import React from 'react';

const NavBar = (props) => (
  <nav>
    <div className="nav-wrapper blue-grey darken-2">
      <a href="/" className="brand-logo">Coollege</a>
      <a href="#" data-activates="mobile" className="button-collapse"><i className="material-icons">menu</i></a>
      <ul className="right hide-on-med-and-down">
       {this.links()}
      </ul>
      <ul className="right hide-on-large-only">
        
      </ul>
      <ul className="side-nav" id="mobile">
       {this.links()}
      </ul>
    </div>
  </nav>
);

export default NavBar;
