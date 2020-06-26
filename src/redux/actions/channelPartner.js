import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { channelPartnerUrl } from '../../utility/api'
import { config } from '../../utility/axiosConfig'
import { ACTION_TYPE } from './actionType'

export const getAllChannelPartner = async () => {
	try {
		const response = await axios.get(channelPartnerUrl, await config())
		await storeAllChannelPartnerInLocal([
			...new Set(response.data.Result.map((result) => result.Name)),
		])

		return {
			type: ACTION_TYPE.GET_CHANNEL_PARTNERS,
			payload: [...new Set(response.data.Result.map((result) => result.Name))],
		}
	} catch (error) {
		console.log(error)
		return []
	}
}

export const storeAllChannelPartnerInLocal = async (channelPartnerList) => {
	try {
		await AsyncStorage.removeItem('@channelPartner:localChannelPartner')
		await AsyncStorage.setItem(
			'@channelPartner:localChannelPartner',
			JSON.stringify(channelPartnerList)
		)
	} catch (error) {
		return []
	}
}

export const getAllLocalChannelPartner = async () => {
	const localChannelPartnerList = await AsyncStorage.getItem(
		'@channelPartner:localChannelPartner'
	)
	return {
		type: ACTION_TYPE.GET_LOCAL_STORAGE_CHNNAEL_PARTNER,
		payload:
			localChannelPartnerList != null
				? JSON.parse(localChannelPartnerList)
				: [],
	}
}
