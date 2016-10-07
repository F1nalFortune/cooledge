import React from 'react'
import { Link } from 'react-router'

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return(
      <div>
        <footer className="page-footer blue-grey darken-4 footer-div">
          <div className="footer-copyright">
            <div className="container">
            © 2016 Copyright &nbsp; &nbsp; Coollege 
            <Link className="grey-text text-lighten-4 right space" to="/about">About Us</Link>
            <Link className="grey-text text-lighten-4 right space" to="/">Home</Link>
            <Link className="grey-text text-lighten-4 right space" to="https://twitter.com" target="_blank">Twitter</Link>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer