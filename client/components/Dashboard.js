import React from 'react';
import ItemForm from './ItemForm';
import Items from './Items';
import Navbar from './NavBar';
import { Link } from 'react-router';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
		this.addItem = this.addItem.bind(this);
		this.toggleItemForm = this.toggleItemForm.bind(this);
  }

  toggleItemForm() {
    let formState = (this.state.showItemForm === 'hidden') ? 'show' : 'hidden';
    this.setState({showItemForm: formState});
  }

	addItem(name, category, condition) {
		let id = ++this.state.id;

		this.setState({
			items: [
				{ name, category, condition, id },
				...this.state.items
			],
			id,
			showItemForm: "hidden"
		});
	};


  render() {
    return (
			<div>
				<div>
					<h2>Welcome to your Dashboard</h2>
					<Link to='/dashboard/57e1f1cc618cc4284b33fb38'>User</Link>
				</div>

			</div>
    )
  }
}

export default Dashboard;
