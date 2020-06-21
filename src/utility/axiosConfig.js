import { AsyncStorage } from 'react-native'

const getStoredAccessToken = async () => {
	const token = JSON.stringify(await AsyncStorage.getItem('@login:accessToken'))
	return token.replace(/['"]+/g, '')
}
export const config = async () => {
	const token = await getStoredAccessToken()

	return {
		headers: { Authorization: `Bearer ${token}` },
	}
}
