const items = (state = [], action) => {
  switch(action.type) {
    case 'GET_ITEMS':
      return action.items || []
    case 'ADD_ITEMS':
      return [
        ...state,
        {
          id: action.id, 
          title: action.title, 
          description: action.description,
          address: action.address,
          contact: action.contact
        }
      ]
    default:
      return state
    
  }
}

export default items;
