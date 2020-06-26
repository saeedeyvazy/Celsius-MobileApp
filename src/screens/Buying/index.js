import { Button, Container, Content, Picker, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import CelsiusHeader from '../../components/common/CelsiusHeader'
import CelsiusInput from '../../components/common/CelsiusInput'
import PickerContainer from '../../components/common/PickerContainer'
import { incrementDate } from '../../utility/Date'
import styles from './style'
import AwesomeAlert from 'react-native-awesome-alerts'

const Buying = ({ navigation, route }) => {
	const [showConfirmAlert, setShowConfirmAlert] = useState(false)

	return (
		<Container>
			<CelsiusHeader></CelsiusHeader>
			<Content>
				<CelsiusInput
					label='Insurance Partner'
					value='FSD Zambia'
					editable={false}
				></CelsiusInput>
				<CelsiusInput
					label='Premium(ZMW)'
					value={route.params.premium}
					editable={false}
				></CelsiusInput>

				<PickerContainer>
					<Picker enabled={false}>
						<Picker.Item label='Intermediary' value='key0' />
						<Picker.Item label='John doe' value='key1' />
						<Picker.Item label='Jean doe' value='key2' />
						<Picker.Item label='Jahn smith' value='key3' />
					</Picker>
				</PickerContainer>
				<PickerContainer>
					<Picker>
						<Picker.Item label='Client' value='key0' />
						<Picker.Item label='Client 1' value='key1' />
						<Picker.Item label='Client 2' value='key2' />
					</Picker>
				</PickerContainer>
				<View style={styles.buttonContainer}>
					<Button danger rounded onPress={() => navigation.navigate('Quote')}>
						<Text>Cancel</Text>
					</Button>

					<Button dark rounded onPress={() => setShowConfirmAlert(true)}>
						<Text>Confirm</Text>
					</Button>
				</View>
			</Content>
			<AwesomeAlert
				show={showConfirmAlert}
				showProgress={false}
				title='Confirmed!'
				message=''
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={true}
				showConfirmButton={true}
				confirmText='   OK   '
				confirmButtonColor='#DD6B55'
				onConfirmPressed={() => setShowConfirmAlert(false)}
				messageStyle={{ textAlign: 'center' }}
				contentContainerStyle={{ width: 300 }}
			/>
		</Container>
	)
}

export default Buying
