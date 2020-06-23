import axios from 'axios'
import { seasonUrl } from '../../utility/api'
import { config } from '../../utility/axiosConfig'
import { ACTION_TYPE } from './actionType'
import { AsyncStorage } from 'react-native'
export const getAllSeason = async () => {
	try {
		const response = await axios.get(seasonUrl, await config())
		const seasons = response.data.Result.map((season) => ({
			name: season.Name,
			id: season.Id,
		}))

		storeAllSeasonInLocal(seasons)

		return {
			type: ACTION_TYPE.GET_SEASON,
			payload: seasons,
		}
	} catch (error) {
		console.log(error)
		return []
	}
}

export const storeAllSeasonInLocal = async (seasonList) => {
	try {
		await AsyncStorage.removeItem('@season:localSeason')
		await AsyncStorage.setItem(
			'@season:localSeason',
			JSON.stringify(seasonList)
		)
	} catch (error) {
		return []
	}
}

export const getAllLocalSeason = async () => {
	const localSeasonList = await AsyncStorage.getItem('@season:localSeason')
	return {
		type: ACTION_TYPE.GET_LOCAL_STORAGE_SEASON,
		payload: localSeasonList != null ? JSON.parse(localSeasonList) : [],
	}
}
