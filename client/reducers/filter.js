const filter = (state = 'SHOW_ALL', action ) => {
	switch (action.type) {
		case 'SET_FILTER':
			return action.category
		default:
			return state
	}
}

export default filter;