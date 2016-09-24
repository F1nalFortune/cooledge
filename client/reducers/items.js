const items = (state = [], action) => {
  switch(action.type) {
    case 'GET_ITEMS':
      return action.items || []
    case 'ADD_ITEMS':
      return [
        ...state,
        {
          id: action.id, 
          name: action.name, 
          description: action.description,
          category: action.category,
          condition: action.condition,
          userId: action.userId,
          url: action.url
        }
      ]
    default:
      return state
  }
}

export default items;
