import { combineReducers } from 'redux'
import { channelPartnerReducer } from './ChannelPartnerReducer'
import { clientReducer } from './ClientReducer'
import { companyReducer } from './CompanyReducer'
import { coopReducer } from './CoopReducer'
import { cropReducer } from './CropReducer'
import { districtReducer } from './DistrictReducer'
import { provinceReducer } from './ProvinceReducer'
import { seaonReducer } from './SeasonReducer'

export default combineReducers({
	provinceList: provinceReducer,
	cropList: cropReducer,
	seasonList: seaonReducer,
	clientList: clientReducer,
	districtList: districtReducer,
	coopList: coopReducer,
	channelPartnerList: channelPartnerReducer,
	companyList: companyReducer,
})
