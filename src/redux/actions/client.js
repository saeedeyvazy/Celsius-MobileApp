import { AsyncStorage } from 'react-native'
import { ACTION_TYPE } from './actionType'
import { clientUrl } from '../../utility/api'
import { config } from '../../utility/axiosConfig'
import axios from 'axios'

const storeDownloadedClientInLocal = async (clientList) => {
	await AsyncStorage.removeItem('@clients:allDownloaded')
	await AsyncStorage.setItem(
		'@clients:allDownloaded',
		JSON.stringify(clientList)
	)
}

export const getDownloadedClient = async () => {
	const localDownloadedClientList = await AsyncStorage.getItem(
		'@clients:allDownloaded'
	)
	return {
		type: ACTION_TYPE.GET_LOCAL_STORAGE_DOWNLOADED_CLIENT,
		payload:
			localDownloadedClientList != null
				? JSON.parse(localDownloadedClientList)
				: [],
	}
}

export const getAllLocalAndDlnClientList = async () => {
	let localClientList = JSON.parse(
		await AsyncStorage.getItem('@clients:localAdded')
	)
	let dnlClientList = JSON.parse(
		await AsyncStorage.getItem('@clients:allDownloaded')
	)
	let allClients = [...localClientList, ...dnlClientList]
	return {
		type: ACTION_TYPE.GET_DNL_LOCAL_CLIENT,
		payload: allClients.filter(
			(v, i, a) =>
				a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
		),
	}
}

export const addClient = async (client) => {
	let clientList = JSON.parse(await AsyncStorage.getItem('@clients:localAdded'))
	clientList == null ? (clientList = []) : null
	clientList.push(client)
	await AsyncStorage.setItem('@clients:localAdded', JSON.stringify(clientList))
}

export const getAllLocalClient = async () => {
	const localAddedClientList = await AsyncStorage.getItem('@clients:localAdded')
	return {
		type: ACTION_TYPE.GET_LOCAL_STORAGE_CLIENT,
		payload:
			localAddedClientList != null ? JSON.parse(localAddedClientList) : [],
	}
}
export const getAllClients = async () => {
	try {
		const response = await axios.get(clientUrl, await config())
		const clients = response.data.Result.map((client) => ({
			firstName: client.FirstName,
			lastName: client.LastName,
			province: client.Province,
			city: client.City,
			registrationNumber: client.RegistrationNumber,
			vatNumber: client.VatNumber,
			title: client.Title,
			initials: client.Initials,
			dateOfBirth: client.DateOfBirth.split('T')[0],
			occupation: client.Occupation,
			idNumber: client.IdNumber,
			channelPartner: client.ChannelPartner,
			email: client.Email,
			district: client.District,
			ethnicGroup: client.EthnicGroup,
			contractMethod: client.ContractMethod,
			mobile: client.Mobile,
			physAddress: client.PhysAddress,
			postalCode: client.PostalCode,
			mobileMoney: client.MobileMoneyNumber,
			insuranceCompany: client.InsuranceCompany,
		}))

		storeDownloadedClientInLocal(clients)
		return {
			type: ACTION_TYPE.GET_CLIENTS,
			payload: clients,
		}
	} catch (error) {
		alert(error)
		console.log(error)
		return []
	}
}

export const uploadLocalAddedClient = async () => {
	let localAddedClientList = JSON.parse(
		await AsyncStorage.getItem('@clients:localAdded')
	)

	if (localAddedClientList != null && localAddedClientList.length > 0) {
		if (!Array.isArray(localAddedClientList))
			localAddedClientList = [localAddedClientList]

		try {
			localAddedClientList.map(async (localClient) => {
				const response = await axios.post(
					clientUrl,
					[localClient],
					await config()
				)
			})
		} catch (error) {
			alert('error. try agian for uploading client')
			console.log(error)
		}
	}
}
