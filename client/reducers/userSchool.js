const userSchool = (state = [], action) => {
	switch (action.type) {
		case 'GET_SCHOOL':
			return action.school
		default:
			return state
	}
}

export default userSchool;