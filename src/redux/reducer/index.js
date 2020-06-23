import { combineReducers } from 'redux'
import { provinceReducer } from './ProvinceReducer'
import { cropReducer } from './CropReducer'
import { seaonReducer } from './SeasonReducer'

export default combineReducers({
	provinceList: provinceReducer,
	cropList: cropReducer,
	seasonList: seaonReducer,
})
