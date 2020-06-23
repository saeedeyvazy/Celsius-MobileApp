import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { regionUrl } from '../../utility/api'
import { config } from '../../utility/axiosConfig'
import { ACTION_TYPE } from './actionType'
export const getAllProvince = async () => {
	try {
		const response = await axios.get(regionUrl, await config())
		await storeAllProvinceInLocal([
			...new Set(response.data.Result.map((result) => result.ProvinceName)),
		])

		return {
			type: ACTION_TYPE.GET_PROVINCE,
			payload: [
				...new Set(response.data.Result.map((result) => result.ProvinceName)),
			],
		}
	} catch (error) {
		console.log(error)
		return []
	}
}

export const storeAllProvinceInLocal = async (provinceList) => {
	try {
		await AsyncStorage.removeItem('@province:localProvince')
		await AsyncStorage.setItem(
			'@province:localProvince',
			JSON.stringify(provinceList)
		)
	} catch (error) {
		return []
	}
}

export const getAllLocalProvince = async () => {
	const localProvinceList = await AsyncStorage.getItem(
		'@province:localProvince'
	)
	console.log(localProvinceList != null ? JSON.parse(localProvinceList) : [])
	return {
		type: ACTION_TYPE.GET_LOCAL_STORAGE_PROVINCE,
		payload: localProvinceList != null ? JSON.parse(localProvinceList) : [],
	}
}
