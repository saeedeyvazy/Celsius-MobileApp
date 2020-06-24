import axios from 'axios'
import { regionUrl } from '../../utility/api'
import { config } from '../../utility/axiosConfig'
import { AsyncStorage } from 'react-native'
import { ACTION_TYPE } from './actionType'
export const getAllDistrict = async () => {
	try {
		const response = await axios.get(regionUrl, await config())
		const districts = [
			...new Set(response.data.Result.map((result) => result.Name)),
		]
		storeAllDistrictInLocal(districts)
		return {
			type: ACTION_TYPE.GET_DISTRICTS,
			payload: districts,
		}
	} catch (error) {
		console.log(error)
		return []
	}
}

export const storeAllDistrictInLocal = async (districtList) => {
	await AsyncStorage.removeItem('@district:localDistrict')
	await AsyncStorage.setItem(
		'@district:localDistrict',
		JSON.stringify(districtList)
	)
}

export const getAllLocalDistrict = async () => {
	const localAddedDistrictList = await AsyncStorage.getItem(
		'@district:localDistrict'
	)
	return {
		type: ACTION_TYPE.GET_LOCAL_STORAGE_DISTRICT,
		payload:
			localAddedDistrictList != null ? JSON.parse(localAddedDistrictList) : [],
	}
}
