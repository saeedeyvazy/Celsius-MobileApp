const { ACTION_TYPE } = require('../actions/actionType')

const INITIAL_STATE = []
export const cropReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPE.GET_CROPS:
			return action.payload

		case ACTION_TYPE.GET_LOCAL_STORAGE_CROPS:
			return action.payload

		default:
			return state
	}
}
