const filter = (state = {filteredItems: false}, action ) => {
	switch (action.type) {
		case 'ALL':
			return {
				filteredItems: true,
				id: action.items
			}
		case 'ACTIVE':
			return {
				filteredItems: true,
				id: action.item.id
			}
		default:
			return state
	}
}

export default filter;