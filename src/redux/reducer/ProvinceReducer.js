const { ACTION_TYPE } = require('../actions/actionType')

const INITIAL_STATE = []
export const provinceReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPE.GET_PROVINCE:
			return action.payload
		case ACTION_TYPE.GET_LOCAL_STORAGE_PROVINCE:
			return action.payload
		default:
			return state
	}
}
