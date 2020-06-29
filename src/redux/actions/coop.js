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

export const getAllLocalAndDlnCoopList = async () => {
	let localCoopList = JSON.parse(
		await AsyncStorage.getItem('@coops:localAdded')
	)
	let dnlCoopList = JSON.parse(
		await AsyncStorage.getItem('@coops:allDownloaded')
	)
	let allCoops = []
	if (localCoopList) allCoops = [...localCoopList, ...dnlCoopList]
	else allCoops = dnlCoopList
	return {
		type: ACTION_TYPE.GET_DNL_LOCAL_COOP,
		payload: allCoops.filter(
			(v, i, a) =>
				a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
		),
	}
}

export const uploadDnlCoop = async () => {
	let dnlCoopList = JSON.parse(
		await AsyncStorage.getItem('@coops:allDownloaded')
	)
	try {
		dnlCoopList.map(async (dnlCoop) => {
			await axios.post(coopUrl, [dnlCoop], await config())
		})
	} catch (error) {
		console.log(error)
	}
}

export const addCoop = async (coop) => {
	let coopList = JSON.parse(await AsyncStorage.getItem('@coops:localAdded'))

	coopList == null ? (coopList = []) : null
	coopList.push(coop)

	await AsyncStorage.setItem('@coops:localAdded', JSON.stringify(coopList))
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
			mobileMoneyNumber: coop.MobileMoneyNumber,
			mobileNumber: coop.MobileNumber,
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
				await axios.post(coopUrl, [localCoop], await config())
			})
			await AsyncStorage.removeItem('@coops:localAdded')
		} catch (error) {
			alert('error. try agian for uploading coop')
			console.log(error)
		}
	}
}

export const addMembers = async (coopId, memberList) => {
	let localCoopList = JSON.parse(
		await AsyncStorage.getItem('@coops:localAdded')
	)
	let dnlCoopList = JSON.parse(
		await AsyncStorage.getItem('@coops:allDownloaded')
	)

	if (Array.isArray(localCoopList) && !localCoopList.length) {
		const localSelectedCoopIndex = findCoop(localCoopList, coopId)

		if (localSelectedCoopIndex) {
			localCoopList[localSelectedCoopIndex].members = [
				...localCoopList[localSelectedCoopIndex].members,
				...memberList,
			]

			await AsyncStorage.setItem(
				'@coops:localAdded',
				JSON.stringify(localCoopList)
			)
		}
	}

	if (Array.isArray(dnlCoopList)) {
		const dnlSelectedCoopIndex = findCoop(dnlCoopList, coopId)

		if (dnlSelectedCoopIndex == 0 || dnlSelectedCoopIndex) {
			dnlCoopList[dnlSelectedCoopIndex].members = [
				...dnlCoopList[dnlSelectedCoopIndex].members,
				...memberList,
			]
			await AsyncStorage.setItem(
				'@coops:allDownloaded',
				JSON.stringify(dnlCoopList)
			)
		}
	}

	return getAllLocalAndDlnCoopList()
}

const findCoop = (coopList, coopId) => {
	return coopList.findIndex((item) => item.id == coopId)
}
