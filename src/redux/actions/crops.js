import axios from 'axios'
import { cropsUrl } from '../../utility/api'
import { config } from '../../utility/axiosConfig'
import { AsyncStorage } from 'react-native'

export const getAllCrops = async () => {
	try {
		const response = await axios.get(cropsUrl, await config())

		return response.data.Result
	} catch (error) {
		console.log(error)
		return []
	}
}

export const storeAllCropsInLocal = async (cropList) => {
	try {
		await AsyncStorage.removeItem('@crop:localCrop')
		await AsyncStorage.setItem('@crop:localCrop', JSON.stringify(cropList))
	} catch (error) {
		return []
	}
}

export const getAllLocalCrop = async () => {
	const localCropList = await AsyncStorage.getItem('@crop:localCrop')
	return localCropList != null ? JSON.parse(localCropList) : []
}
