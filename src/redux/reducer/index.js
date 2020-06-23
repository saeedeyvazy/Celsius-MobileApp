import { combineReducers } from 'redux'
import { provinceReducer } from './ProvinceReducer'

export default combineReducers({
	provinceList: provinceReducer,
})
