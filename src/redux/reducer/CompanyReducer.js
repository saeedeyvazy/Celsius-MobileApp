const { ACTION_TYPE } = require('../actions/actionType')

const INITIAL_STATE = []
export const companyReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPE.GET_COMPANY:
			return action.payload
		case ACTION_TYPE.GET_LOCAL_STORAGE_COMPANY:
			return action.payload
		default:
			return state
	}
}
