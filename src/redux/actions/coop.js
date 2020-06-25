import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { config } from '../../utility/axiosConfig'
import { ACTION_TYPE } from './actionType'
import { coopUrl } from '../../utility/api'

const storeDownloadedCoopInLocal = async (coopList) => {
	await AsyncStorage.removeItem('@coops:allDownloaded')
	await AsyncStorage.setItem('@coops:allDownloaded', JSON.stringify(coopList))
}

export const getDownloadedCoop = async () => {
	const localDownloadedCoopList = await AsyncStorage.getItem(
		'@coops:allDownloaded'
	)
	return {
		type: ACTION_TYPE.GET_LOCAL_STORAGE_DOWNLOADED_COOP,
		payload:
			localDownloadedCoopList != null
				? JSON.parse(localDownloadedCoopList)
				: [],
	}
}

export const addCoop = async (coop) => {
	let coopList = JSON.parse(await AsyncStorage.getItem('@coops:localAdded'))

	coopList == null ? (coopList = []) : null
	coopList.push(coop)

	await AsyncStorage.setItem('@coops:localAdded', JSON.stringify(coopList))

	console.log(JSON.parse(await AsyncStorage.getItem('@coops:localAdded')))
}

export const getAllLocaCoop = async () => {
	const localAddedCoopList = await AsyncStorage.getItem('@coops:localAdded')
	return {
		type: ACTION_TYPE.GET_LOCAL_STORAGE_COOP,
		payload: localAddedCoopList != null ? JSON.parse(localAddedCoopList) : [],
	}
}
export const getAllCoops = async () => {
	try {
		const response = await axios.get(coopUrl, await config())
		const coops = response.data.Result.map((coop) => ({
			tradingName: coop.TradingName,
			members: coop.Members,
			id: coop.Id,
			firstName: coop.FirstName,
			lastName: coop.LastName,
			createdBy: coop.CreatedBy,
			city: coop.City,
			registrationNumber: coop.RegistrationNumber,
			vatNumber: coop.VatNumber,
			title: coop.Title,
			province: coop.Province,
			district: coop.District,
			email: coop.Email,
			district: coop.District,
			contractMethod: coop.ContractMethod,
			mobile: coop.MobileNumber,
			physAddress: coop.PhysAddress,
			postalCode: coop.PostalCode,
			mobileMoney: coop.MobileMoneyNumber,
			regionId: coop.RegionId,
		}))

		storeDownloadedCoopInLocal(coops)
		return {
			type: ACTION_TYPE.GET_COOPS,
			payload: coops,
		}
	} catch (error) {
		alert(error)
		console.log(error)
		return []
	}
}

export const uploadLocalAddedCoop = async () => {
	let localAddedCoopList = JSON.parse(
		await AsyncStorage.getItem('@coops:localAdded')
	)
	if (localAddedCoopList != null && localAddedCoopList.length > 0) {
		if (!Array.isArray(localAddedCoopList))
			localAddedCoopList = [localAddedCoopList]

		try {
			localAddedCoopList.map(async (localCoop) => {
				const response = await axios.post(coopUrl, [localCoop], await config())
				console.log(response)
			})
		} catch (error) {
			alert('error. try agian for uploading coop')
			console.log(error)
		}
	}
}
