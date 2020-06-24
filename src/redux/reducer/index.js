import { combineReducers } from 'redux'
import { provinceReducer } from './ProvinceReducer'
import { cropReducer } from './CropReducer'
import { seaonReducer } from './SeasonReducer'
import { clientReducer } from './ClientReduce'
import { districtReducer } from './DistrictReducer'

export default combineReducers({
	provinceList: provinceReducer,
	cropList: cropReducer,
	seasonList: seaonReducer,
	clientList: clientReducer,
	districtList: districtReducer,
})
