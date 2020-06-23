import axios from 'axios'
import { cropsUrl } from '../../utility/api'
import { config } from '../../utility/axiosConfig'
import { AsyncStorage } from 'react-native'
import { ACTION_TYPE } from './actionType'

export const getAllCrops = async () => {
	try {
		const response = await axios.get(cropsUrl, await config())
		const crops = response.data.Result

		storeAllCropsInLocal(crops)

		return {
			type: ACTION_TYPE.GET_CROPS,
			payload: crops,
		}
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
	return {
		type: ACTION_TYPE.GET_LOCAL_STORAGE_CROPS,
		payload: localCropList != null ? JSON.parse(localCropList) : [],
	}
}
