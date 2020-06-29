import {
	Body,
	Button,
	Container,
	Content,
	Icon,
	Left,
	List,
	ListItem,
	Text,
} from 'native-base'
import React, { useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
import Spinner from 'react-native-loading-spinner-overlay'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import CelsiusHeader from '../../components/common/CelsiusHeader'
import CelsiusInput from '../../components/common/CelsiusInput'
import { getAllChannelPartner } from '../../redux/actions/channelPartner'
import {
	getAllClients,
	uploadLocalAddedClient,
} from '../../redux/actions/client'
import {
	getAllCoops,
	uploadLocalAddedCoop,
	uploadDnlCoop,
} from '../../redux/actions/coop'
import { getAllCrops } from '../../redux/actions/crops'
import { getAllDistrict } from '../../redux/actions/district'
import { getAllCompany } from '../../redux/actions/company'
import { getAllProvince } from '../../redux/actions/province'
import { getAllSeason } from '../../redux/actions/season'
import { isNetworkAvailable } from '../../utility/network'

const Setting = ({
	navigation,
	getProvinceList,
	getCropList,
	getSeasonList,
	getClientList,
	getDistrictList,
	getCoopList,
	getChannelPartnerList,
	getCompanyList,
}) => {
	const [isVisibleloginModal, setIsVisibleLoginModal] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [showCheckConnectionAlert, setShowCheckConnectionAlert] = useState(
		false
	)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showSpinner, setShowSpinner] = useState(false)
	const [showSyncSuccessfully, setShowSyncSuccessfully] = useState(false)

	const syncWithServer = async () => {
		const connected = await isNetworkAvailable()
		if (!connected) setShowCheckConnectionAlert(true)
		if (!isLoggedIn) setIsVisibleLoginModal(true)
		if (connected && isLoggedIn) {
			setShowSpinner(true)
			await uploadLocalAddedClient()
			await uploadLocalAddedCoop()
			await uploadDnlCoop()

			await getProvinceList()
			await getChannelPartnerList()
			await getCompanyList()
			await getCropList()
			await getSeasonList()
			await getClientList()
			await getCoopList()
			await getDistrictList()

			setShowSpinner(false)
			setTimeout(() => setShowSyncSuccessfully(true), 1000)
		}
	}
	return (
		<>
			<Container>
				<CelsiusHeader></CelsiusHeader>
				<Content>
					<ListItem>
						<Left></Left>
						<Body>
							<Button
								bordered
								iconRight
								full
								danger
								onPress={() => navigation.navigate('Login')}
							>
								<Text uppercase={false}>Logout</Text>
								<Icon type='AntDesign' name='logout'></Icon>
							</Button>
						</Body>
					</ListItem>
					<Button
						iconRight
						block
						dark
						onPress={async () => {
							await syncWithServer()
						}}
					>
						<Text uppercase={false}>Sync with server</Text>
						<Icon type='MaterialCommunityIcons' name='sync'></Icon>
					</Button>
					<List style={{ display: isLoggedIn ? 'flex' : 'none' }}>
						<ListItem itemDivider>
							<Text>Sync History</Text>
						</ListItem>
						<ListItem underlayColor>
							<Text>last update 2020/07/01</Text>
						</ListItem>
					</List>
				</Content>
				{/* <SyncServerModal
					isVisible={isVisibleModal}
					close={() => setIsVisibleModal(false)}
				></SyncServerModal> */}
			</Container>
			<Spinner visible={showSpinner} textContent='syncing...'></Spinner>
			<AwesomeAlert
				show={showCheckConnectionAlert}
				showProgress={false}
				title='Internet Connection'
				message='Please check your internet connection before server syncing!'
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={true}
				showConfirmButton={true}
				confirmText='    OK    '
				confirmButtonColor='#DD6B55'
				onConfirmPressed={() => setShowCheckConnectionAlert(false)}
				messageStyle={{ textAlign: 'center' }}
			/>
			<AwesomeAlert
				show={showSyncSuccessfully}
				showProgress={false}
				title='Sync'
				message='Sync with server was successfully!'
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={true}
				showConfirmButton={true}
				confirmText='   OK   '
				confirmButtonColor='#DD6B55'
				onConfirmPressed={() => setShowSyncSuccessfully(false)}
				messageStyle={{ textAlign: 'center' }}
			/>
			<Modal
				isVisible={isVisibleloginModal}
				animationInTiming={600}
				animationIn='fadeInRight'
				animationOut='fadeOutRight'
				animationOutTiming={600}
			>
				<Container>
					<CelsiusHeader></CelsiusHeader>
					<Content>
						<CelsiusInput
							label='User name'
							onChangeText={(value) => setUsername(value)}
							value={username}
						></CelsiusInput>
						<CelsiusInput
							label='Password'
							onChangeText={(value) => setPassword(value)}
							value={password}
						></CelsiusInput>
						<Button
							full
							dark
							style={{ marginTop: 40 }}
							onPress={() => {
								setIsVisibleLoginModal(false)
								setIsLoggedIn(true)
							}}
						>
							<Text>Login</Text>
						</Button>
					</Content>
				</Container>
			</Modal>
		</>
	)
}

const mapDispatchToProps = (dispath) => {
	return {
		getProvinceList: async () => {
			dispath(await getAllProvince())
		},
		getCropList: async () => {
			dispath(await getAllCrops())
		},
		getSeasonList: async () => {
			dispath(await getAllSeason())
		},
		getClientList: async () => {
			dispath(await getAllClients())
		},
		getDistrictList: async () => {
			dispath(await getAllDistrict())
		},
		getCoopList: async () => {
			dispath(await getAllCoops())
		},

		getChannelPartnerList: async () => {
			dispath(await getAllChannelPartner())
		},
		getCompanyList: async () => {
			dispath(await getAllCompany())
		},
	}
}

export default connect(null, mapDispatchToProps)(Setting)
