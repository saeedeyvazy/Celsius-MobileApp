const { ACTION_TYPE } = require('../actions/actionType')

const INITIAL_STATE = []
export const coopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPE.GET_COOPS:
			return action.payload

		case ACTION_TYPE.GET_LOCAL_STORAGE_DOWNLOADED_COOP:
			return action.payload

		default:
			return state
	}
}
