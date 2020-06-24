const { ACTION_TYPE } = require('../actions/actionType')

const INITIAL_STATE = []
export const districtReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPE.GET_DISTRICTS:
			return action.payload

		case ACTION_TYPE.GET_LOCAL_STORAGE_DISTRICT:
			return action.payload

		default:
			return state
	}
}
