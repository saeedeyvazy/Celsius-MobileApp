import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { loginUrl } from '../../utility/api'
import { isNullOrEmpty } from '../../utility/string'
export const login = async (username, pwd) => {
	try {
		const response = await axios.post(
			`${loginUrl}?username=${username}&pwd=${pwd}`
		)
		await AsyncStorage.setItem(
			'@login:accessToken',
			response.data.Result.AccToken
		)
		if (isNullOrEmpty(response.data.Result.AccToken)) return false
		return true
	} catch (error) {
		return false
	}
}
