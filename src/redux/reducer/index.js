import { combineReducers } from 'redux'
import { provinceReducer } from './ProvinceReducer'
import { cropReducer } from './CropReducer'
import { seaonReducer } from './SeasonReducer'
import { clientReducer } from './ClientReducer'
import { districtReducer } from './DistrictReducer'
import { coopReducer } from './CoopReducer'
import { channelPartnerReducer } from './ChannelPartnerReducer'

export default combineReducers({
	provinceList: provinceReducer,
	cropList: cropReducer,
	seasonList: seaonReducer,
	clientList: clientReducer,
	districtList: districtReducer,
	coopList: coopReducer,
	channelPartnerList: channelPartnerReducer,
})
