import axios from 'axios'
import { clientUrl } from '../../utility/api'
import { config } from '../../utility/axiosConfig'
import { getAllLocalClient, storeAllClientInLocal } from './client'
import { getAllProvince, storeAllProvinceInLocal } from './province'
import { getAllCrops, storeAllCropsInLocal } from './crops'

const uploadLocalAddedClient = async () => {
	let localAddedClientList = await getAllLocalClient()
	if (localAddedClientList != null && localAddedClientList.length > 0) {
		if (!Array.isArray(localAddedClientList))
			localAddedClientList = [localAddedClientList]

		try {
			localAddedClientList.map(async (localClient) => {
				await axios.post(clientUrl, [localClient], await config())
			})
		} catch (error) {
			alert('error. try agian for uploading client')
			console.log(error)
		}
	}
}

export const sync = async () => {
	await uploadLocalAddedClient()
	await getAllClients()
	await getAllProvince()
	await getAllCrops()
}
