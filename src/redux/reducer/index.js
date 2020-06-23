import { combineReducers } from 'redux'
import { provinceReducer } from './ProvinceReducer'
import { cropReducer } from './CropReducer'

export default combineReducers({
	provinceList: provinceReducer,
	cropList: cropReducer,
})
