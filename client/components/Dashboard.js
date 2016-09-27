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

				<div>
					<h2 className="sitefont">Welcome to your Dashboard</h2>
					<Link to='/dashboard/57e1f1cc618cc4284b33fb38'>User</Link>
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
