import { combineReducers } from 'redux'
import { provinceReducer } from './ProvinceReducer'
import { cropReducer } from './CropReducer'
import { seaonReducer } from './SeasonReducer'
import { clientReducer } from './ClientReduce'

export default combineReducers({
	provinceList: provinceReducer,
	cropList: cropReducer,
	seasonList: seaonReducer,
	clientList: clientReducer,
})
