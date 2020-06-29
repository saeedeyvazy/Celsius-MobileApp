import {
	Button,
	Container,
	Content,
	Picker,
	Text,
	View,
	Label,
} from 'native-base'
import React, { useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
import CelsiusHeader from '../../components/common/CelsiusHeader'
import CelsiusInput from '../../components/common/CelsiusInput'
import PickerContainer from '../../components/common/PickerContainer'
import styles from './style'
import ChannelPartner from '../../components/common/ChannelPartner'
import Company from '../../components/common/Company'
import { connect } from 'react-redux'

const Buying = ({ navigation, route, clientList }) => {
	const [showConfirmAlert, setShowConfirmAlert] = useState(false)
	const [channelPartner, setChannelPartner] = useState('')
	const [selectedClient, setSelectedClient] = useState('key0')
	const [company, setCompany] = useState('')

	return (
		<Container>
			<CelsiusHeader></CelsiusHeader>
			<Content>
				<CelsiusInput
					label='Premium(ZMW)'
					value={route.params.premium}
					editable={false}
				></CelsiusInput>
				<ChannelPartner onValueChange={(value) => setChannelPartner(value)}>
					<Label style={{ fontSize: 14, marginLeft: 10, marginTop: 14 }}>
						Channel Partner
					</Label>
				</ChannelPartner>
				<Company onValueChange={(value) => setCompany(value)}>
					<Label style={{ fontSize: 14, marginLeft: 10, marginTop: 14 }}>
						Insurance Partner
					</Label>
				</Company>
				<PickerContainer>
					<Picker enabled={false}>
						<Picker.Item label='Intermediary' value='key0' />
						<Picker.Item label='John doe' value='key1' />
						<Picker.Item label='Jean doe' value='key2' />
						<Picker.Item label='Jahn smith' value='key3' />
					</Picker>
				</PickerContainer>
				<PickerContainer>
					<Picker
						selectedValue={selectedClient}
						onValueChange={(id) => setSelectedClient(id)}
					>
						<Picker.Item label='select client' value='key0'></Picker.Item>
						{clientList.map((client) => (
							<Picker.Item
								label={`${client.firstName} ${client.lastName}`}
								value={client.id}
							/>
						))}
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
				onConfirmPressed={() => {
					setShowConfirmAlert(false)
					navigation.navigate('Quote')
				}}
				messageStyle={{ textAlign: 'center' }}
				contentContainerStyle={{ width: 300 }}
			/>
		</Container>
	)
}

const mapStateToProps = (state) => {
	const { clientList } = state
	return { clientList }
}
export default connect(mapStateToProps)(Buying)
