import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import { connect } from 'react-redux'
import { getAllLocalAndDlnClientList } from '../../../redux/actions/client'
import { Container, Content } from 'native-base'
import Modal from 'react-native-modal'

const ClientListPicker = ({
	submitSelectedClients,
	isVisible,
	clientList,
	getAllClientList,
	onBackButtonPress,
}) => {
	const [selectedClients, setSelectedClients] = useState([])

	useEffect(() => {
		const fetchClientList = async () => {
			clientList.length == 0 ? getAllClientList() : null
		}

		fetchClientList()
	}, [])

	return (
		<Modal
			isVisible={isVisible}
			animationInTiming={600}
			animationIn='fadeInRight'
			animationOut='fadeOutRight'
			animationOutTiming={600}
			onBackButtonPress={() => onBackButtonPress()}
		>
			<Container>
				<Content>
					<ScrollView>
						<TouchableOpacity
							onPress={() => submitSelectedClients(selectedClients)}
							style={{
								height: 50,
								width: '100%',
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: '#dadde3',
							}}
						>
							<Text>OK</Text>
						</TouchableOpacity>
						<MultipleSelectPicker
							items={clientList.map((item) => ({
								label: `${item.firstName} ${item.lastName}`,
								value: item.id,
							}))}
							onSelectionsChange={(list) => {
								setSelectedClients(list)
							}}
							selectedItems={selectedClients}
							buttonStyle={{
								height: 100,
								justifyContent: 'center',
								alignItems: 'center',
							}}
							buttonText='hello'
							checkboxStyle={{ height: 20, width: 20 }}
						/>
					</ScrollView>
				</Content>
			</Container>
		</Modal>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllClientList: async () => {
			dispatch(await getAllLocalAndDlnClientList())
		},
	}
}

const mapStateToProps = (state) => {
	const { clientList } = state
	return {
		clientList,
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ClientListPicker)
