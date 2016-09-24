import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo, getVisible } from './actions';
import Items from './Items';

const mapStateToProps = (state) => {
  return {
    todos: getVisible(state.todos, state.filter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (category) => {
      dispatch(toggleTodo(category))
    }
  }
}

const getFilteredItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default getFilteredItems;