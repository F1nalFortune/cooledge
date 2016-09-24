import React from 'react';
import ItemForm from './ItemForm';
import Items from './Items';
import Navbar from './NavBar';
import { Link } from 'react-router';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    	<div>

				<div className="row">
					<h2 className="col s6">Welcome to your Dashboard</h2>
					<h3 className="clo s6 right-align"><Link to='/dashboard/57e1f1cc618cc4284b33fb38'>User</Link></h3>
				</div>
	      <div>
        <Items />
					{/* <Navbar />
					<ItemForm
					showItemForm={this.state.showItemForm}
					addItem={this.addItem} />
					<Item /> */}
	      </div>
	    </div>
    )
  }
}

export default Dashboard;
