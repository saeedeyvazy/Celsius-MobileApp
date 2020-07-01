import {
	Body,
	Button,
	Container,
	Content,
	Icon,
	Input,
	Left,
	List,
	ListItem,
	Right,
	Text,
	Thumbnail,
	View,
} from 'native-base'
import AwesomeAlert from 'react-native-awesome-alerts'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import CelsiusHeader from '../../components/common/CelsiusHeader'
import ClientListPickerItem from '../../components/common/ClientListPickerItem'
import DeleteUser from '../../components/common/DeleteUser'
import { coopDetailInfoMap } from '../../utility/apiResponseMap'
import { isNullOrEmpty } from '../../utility/string'
import style from './styles'
import { addMembers } from '../../redux/actions/coop'
import { connect } from 'react-redux'

const ViewCooperative = ({
	navigation,
	route,
	addMemberToCoop,
	getDnlLocalCoopList,
}) => {
	const { coopDetailInfo } = route.params
	const [isVisible, setIsVisible] = useState(false)
	const [localAddMember, setLocalAddMember] = useState([])
	const [saveClientAlertShow, setSaveClientAlertShow] = useState(false)
	const save = async () => {
		setSaveClientAlertShow(false)
		navigation.navigate('Coop')

		await addMemberToCoop(
			coopDetailInfo.coop.id,
			localAddMember.map((item) => item.value)
		)
		await getDnlLocalCoopList()
	}

	const deleteCoop = () => {
		Alert.alert(
			'Delete Coop',
			'Delete Coop Successfully',
			[{ text: 'OK', onPress: () => navigation.navigate('Coop') }],
			{ cancelable: false }
		)
	}

	return (
		<Container>
			<CelsiusHeader></CelsiusHeader>
			<Content>
				<List>
					<ListItem itemDivider>
						<Text>Coop Information</Text>
					</ListItem>
					{Object.keys(coopDetailInfo.coop).map((key, index) => {
						return !isNullOrEmpty(coopDetailInfoMap[key]) ? (
							<ListItem first key={index}>
								<Left>
									<Text style={style.label}>{coopDetailInfoMap[key]}</Text>
								</Left>
								<Body>
									<Input disabled style={{ fontSize: 13 }}>
										{coopDetailInfo.coop[key]}
									</Input>
								</Body>
							</ListItem>
						) : null
					})}
				</List>
				<List>
					<ListItem itemDivider>
						<Text>Members</Text>
					</ListItem>
					<Left></Left>
					<Button
						iconRight
						bordered
						dark
						block
						onPress={() => setIsVisible(true)}
					>
						<Text>Add Member</Text>
						<Icon name='adduser' type='AntDesign'></Icon>
					</Button>
					<Right></Right>
					{coopDetailInfo.members.map((member, index) => (
						<ListItem thumbnail key={index}>
							<Left>
								<Thumbnail
									circular
									source={require('../../img/no-avatar.png')}
								/>
							</Left>
							<Body>
								<Text>{member}</Text>
								<Text note numberOfLines={1}></Text>
							</Body>
							<Right>
								<DeleteUser></DeleteUser>
							</Right>
						</ListItem>
					))}

					{localAddMember.map((member, index) => (
						<ListItem thumbnail key={index}>
							<Left>
								<Thumbnail
									circular
									source={require('../../img/no-avatar.png')}
								/>
							</Left>
							<Body>
								<Text>{member.label}</Text>
								<Text note numberOfLines={1}></Text>
							</Body>
							<Right>
								<DeleteUser></DeleteUser>
							</Right>
						</ListItem>
					))}
				</List>

				<ClientListPickerItem
					isVisible={isVisible}
					submitSelectedClients={(selectedClientList) => {
						setIsVisible(false)
						setLocalAddMember(selectedClientList)
					}}
					onBackButtonPress={() => setIsVisible(false)}
				></ClientListPickerItem>
				<View>
					<Button
						iconLeft
						full
						dark
						onPress={() => setSaveClientAlertShow(true)}
					>
						<Icon type='Octicons' name='check'></Icon>
						<Text>Save</Text>
					</Button>
					<Button
						iconLeft
						full
						warning
						onPress={() => navigation.navigate('Coop')}
					>
						<Icon name='cross' type='Entypo'></Icon>
						<Text>Cancel</Text>
					</Button>

					<Button rounded full iconLeft danger onPress={() => deleteCoop()}>
						<Icon name='trash' type='Entypo'></Icon>
						<Text>Delete</Text>
					</Button>
				</View>
			</Content>
			<AwesomeAlert
				show={saveClientAlertShow}
				showProgress={false}
				title='Add Member/Members'
				message='Are you sure to save members?'
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={true}
				showCancelButton={true}
				showConfirmButton={true}
				cancelText='No, cancel'
				confirmText='Yes, save it'
				confirmButtonColor='#DD6B55'
				onCancelPressed={() => setSaveClientAlertShow(false)}
				onConfirmPressed={() => save()}
				messageStyle={{ textAlign: 'center' }}
			/>
		</Container>
	)
}
const mapDispatchToProps = (dispatch) => {
	return {
		addMemberToCoop: async (id, members) => {
			dispatch(await addMembers(id, members))
		},
		getDnlLocalCoopList: async () => {
			dispatch(await getAllLocalAndDlnCoopList())
		},
	}
}
export default connect(null, mapDispatchToProps)(ViewCooperative)
