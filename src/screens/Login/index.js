import React, { useState } from 'react'
import LoginScreen from 'react-native-login-screen'
import { login, rememberMe } from '../../redux/actions/login'
import AwesomeAlert from 'react-native-awesome-alerts'

const Login = ({ navigation }) => {
	const [username, setUsername] = useState(null)
	const [pwd, setPwd] = useState(null)
	const [switchValue, setSwitchValue] = useState(false)
	const [showLoginFailedAlert, setShowLoginFailedAlert] = useState(false)

	const onPressLogin = async () => {
		const isLoginSuccessFully = await login(username, pwd)
		if (isLoginSuccessFully) navigation.navigate('BottomNavigation')
		else setShowLoginFailedAlert(true)
	}

	return (
		<>
			<LoginScreen
				disableSettings
				switchTextStyle={{ color: 'black' }}
				logoText='CelsiusPro'
				loginButtonBackgroundColor='#282828'
				source={require('../../img/wheat3.jpeg')}
				switchValue={switchValue}
				onPressLogin={async () => onPressLogin()}
				usernameOnChangeText={(username) => setUsername(username)}
				passwordOnChangeText={(password) => setPwd(password)}
				onSwitchValueChange={(switchValue) => {
					setSwitchValue(switchValue)
					switchValue ? rememberMe(username, pwd) : null
				}}
			></LoginScreen>
			<AwesomeAlert
				show={showLoginFailedAlert}
				showProgress={false}
				title='Login Failed'
				message='Please check your username or password or internet connection'
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={true}
				showConfirmButton={true}
				confirmText='      OK        '
				confirmButtonColor='#DD6B55'
				onConfirmPressed={() => setShowLoginFailedAlert(false)}
				messageStyle={{ textAlign: 'center' }}
			/>
		</>
	)
}

export default Login
