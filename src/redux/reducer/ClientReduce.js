const { ACTION_TYPE } = require('../actions/actionType')

const INITIAL_STATE = []
export const clientReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPE.GET_CLIENTS:
			return action.payload

		case ACTION_TYPE.GET_LOCAL_STORAGE_CLIENT:
			return action.payload

		default:
			return state
	}
}
