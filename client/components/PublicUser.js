import React from 'react';
import $ from 'jquery';
import App from '../containers/App';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchItems } from '../actions';
import Collapsible from 'react-collapsible';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    this.state = { users: [], items: [], offers: [], showItemForm: false, showUpload: false};
  }

  componentWillMount() {
    this.props.dispatch(fetchItems());
    this.getUser();
  }

  getUser(){
    let id = this.props.auth.id
    $.ajax({
      url: `/api/users/${id}`,
      type: 'GET',
      dataType: 'JSON'
    }).done( res => {
      let { users, items, offers } = res;
      this.setState({ users, items, offers });
    }).fail( msg => {
      console.log(msg)
    });
   }


  render() {
    let availableItems = this.state.items.map( (item) => {
      if (!item.needed) {
        return (
                <Collapsible className="Collapsible__trigger"trigger={item.name} triggerWhenOpen={item.condition} data-collapsible="accordion">
                  <div className="Collapsible">
                    <div className="row Collapsible__contentInner ">
                     <div className="col s12 m12">
                        <img width="500px" src={item.url ? item.url : {} } />
                      </div>
                      <div className="col s12 m12">
                        <h4>
                          {item.description}
                        </h4>
                      </div>
                    </div>
                    <div className="row Collapsible__contentInner">
                      <div className="col s3 m3 offset-m3 offset-s3">
                        <Link to={`/items/${item._id}`} key={item._id} className="collection-item">
                          Item Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </Collapsible>
        );
      }
    });

    let wantedItems = this.state.items.map( (item) => {
      if (item.needed) {
        return (

                <Collapsible className="Collapsible__trigger"trigger={item.name} triggerWhenOpen={item.condition} data-collapsible="accordion">
                  <div className="Collapsible">
                    <div className="row Collapsible__contentInner ">
                     <div className="col s12 m12">
                        <img width="500px" src={item.url ? item.url : {} } />
                      </div>
                      <div className="col s12 m12">
                        <h4>
                          {item.description}
                        </h4>
                      </div>
                    </div>
                    <div className="row Collapsible__contentInner">
                      <div className="col s3 m3 offset-m3 offset-s3">
                        <Link to={`/items/${item._id}`} key={item._id} className="collection-item">
                          Item details
                        </Link>
                      </div>
                    </div>

                  </div>
                </Collapsible>
        );
      }
    });

    return (

    <div>
      <div className="row bck">
        <div className="container toppad">
          <div className="row">
            <div className="col s12 m4">
              <h5 className="profile-text">{this.state.users.name}</h5>  
              <img height="200px" src={this.state.users.url}/>
            </div>
            <div className="col s12 m8">
              <div className="row">
                <h5 className="profile-text">School:</h5>
                <h5 className="profile-text">{this.state.users.school}</h5>
              </div>
              <div className="row">
                <h5 className="profile-text">General:</h5>
                <h5 className="profile-text">{this.state.users.general}</h5>  
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row add-offer-bg">
        <div className="col s6 m6">
          <h3 className="center">Items available</h3>

            {availableItems}

        </div>
        <div className="col s6 m6">
          <h3 className="center">Items Needed</h3>

            {wantedItems}

        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, items: state.items };
}

export default connect(mapStateToProps)(User);