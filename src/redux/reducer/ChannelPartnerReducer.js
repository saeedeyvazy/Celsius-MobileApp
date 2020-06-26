const { ACTION_TYPE } = require('../actions/actionType')

const INITIAL_STATE = []
export const channelPartnerReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTION_TYPE.GET_CHANNEL_PARTNERS:
			return action.payload
		case ACTION_TYPE.GET_LOCAL_STORAGE_CHNNAEL_PARTNER:
			return action.payload
		default:
			return state
	}
}
