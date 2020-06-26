import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { companyUrl } from '../../utility/api'
import { config } from '../../utility/axiosConfig'
import { ACTION_TYPE } from './actionType'

export const getAllCompany = async () => {
	try {
		const response = await axios.get(companyUrl, await config())
		console.log(response.data.Result)
		await storeAllCompanyInLocal([
			...new Set(response.data.Result.map((result) => result.Name)),
		])

		return {
			type: ACTION_TYPE.GET_COMPANY,
			payload: [...new Set(response.data.Result.map((result) => result.Name))],
		}
	} catch (error) {
		console.log(error)
		return []
	}
}

export const storeAllCompanyInLocal = async (companyList) => {
	try {
		await AsyncStorage.removeItem('@company:localCompany')
		await AsyncStorage.setItem(
			'@company:localCompany',
			JSON.stringify(companyList)
		)
	} catch (error) {
		return []
	}
}

export const getAllLocalCompany = async () => {
	const companyList = await AsyncStorage.getItem('@company:localCompany')
	return {
		type: ACTION_TYPE.GET_LOCAL_STORAGE_COMPANY,
		payload: companyList != null ? JSON.parse(companyList) : [],
	}
}
