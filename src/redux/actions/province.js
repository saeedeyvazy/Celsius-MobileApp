import axios from 'axios'
import { regionUrl } from '../../utility/api'
import { config } from '../../utility/axiosConfig'
import { AsyncStorage } from 'react-native'
export const getAllProvince = async () => {
	try {
		const response = await axios.get(regionUrl, await config())
		return [
			...new Set(response.data.Result.map((result) => result.ProvinceName)),
		]
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
	return localProvinceList != null ? JSON.parse(localProvinceList) : []
}
