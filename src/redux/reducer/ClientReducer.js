const { ACTION_TYPE } = require('../actions/actionType')

const INITIAL_STATE = []
export const clientReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPE.GET_CLIENTS:
			return action.payload

		case ACTION_TYPE.GET_LOCAL_STORAGE_DOWNLOADED_CLIENT:
			return action.payload

		case ACTION_TYPE.GET_LOCAL_STORAGE_CLIENT:
			return action.payload

		case ACTION_TYPE.GET_DNL_LOCAL_CLIENT:
			return action.payload

		default:
			return state
	}
}
