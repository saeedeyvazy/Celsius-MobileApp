import axios from 'axios'
import { clientUrl } from '../../utility/api'
import { config } from '../../utility/axiosConfig'
import { AsyncStorage } from 'react-native'
export const getAllClients = async () => {
	try {
		const response = await axios.get(clientUrl, config)

		return response.data.Result.map((client) => ({
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
		}))
	} catch (error) {
		console.log(error)
		return []
	}
}

export const addClient = async (client) => {
	let oldClientList = await AsyncStorage.getItem('clients')

	if (oldClientList == null)
		await AsyncStorage.setItem('clients', JSON.stringify([client]))
	else
		await AsyncStorage.setItem(
			'clients',
			JSON.stringify([...JSON.parse(oldClientList), client])
		)
}
