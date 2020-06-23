const { ACTION_TYPE } = require('../actions/actionType')

const INITIAL_STATE = []
export const seaonReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPE.GET_SEASON:
			return action.payload

		case ACTION_TYPE.GET_LOCAL_STORAGE_SEASON:
			return action.payload

		default:
			return state
	}
}
