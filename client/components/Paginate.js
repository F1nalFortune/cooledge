import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';

window.React = React;


export class CommentList extends Component {
  render() {
    let itemArr = this.props.filter === 'SHOW_ALL' ? this.props.items : this.state.items;
    let items = itemArr.map( (item) => {
      return (
      <div className="col s10 m4 item-list-div">
        <Link to={`/items/${item._id}`} key={item._id} >
          <img className="img-size" src={item.url} />
        </Link>
      </div>
      );
    });

    return (
      <div id="project-comments" className="commentList">
        <ul>
          {items}
        </ul>
      </div>
    );
  }
};

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0
    }
  }

  loadItemsFromServer() {
    $.ajax({
      url      : this.props.url,
      data     : {limit: this.props.perPage, offset: this.state.offset},
      dataType : 'json',
      type     : 'GET',

      success: data => {
        this.setState({data: data.items, pageNum: Math.ceil(data.meta.total_count / data.meta.limit)});
      },

      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadItemsFromServer();
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({offset: offset}, () => {
      this.loadItemsFromServer();
    });
  };

  render() {
    return (
      <div className="commentBox">
        <CommentList data={this.state.data} />
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
      </div>
    );
  }
};

ReactDOM.render(
  <App url={'http://localhost:3000/comments'}
       author={'adele'}
       perPage={10} />,
  document.getElementById('react-paginate')
);