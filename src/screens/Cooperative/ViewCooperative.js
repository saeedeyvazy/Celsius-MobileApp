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
import React from 'react'
import { Alert } from 'react-native'
import CelsiusHeader from '../../components/common/CelsiusHeader'
import DeleteUser from '../../components/common/DeleteUser'
import { coopDetailInfoMap } from '../../utility/apiResponseMap'
import { isNullOrEmpty } from '../../utility/string'
import style from './styles'

const AddCooperative = ({ navigation, route }) => {
	const { coopDetailInfo } = route.params
	const confirm = () => {
		Alert.alert(
			'Saved changes',
			'Confirmed!',
			[{ text: 'OK', onPress: () => navigation.navigate('Coop') }],
			{ cancelable: false }
		)
	}
	const deleteCoop = () => {
		Alert.alert(
			'Delete Coop',
			'Delete Coop Successfully',
			[{ text: 'OK', onPress: () => navigation.navigate('Coop') }],
			{ cancelable: false }
		)
	}
	const cancel = () => {
		navigation.navigate('Coop')
	}

	return (
		<Container>
			<CelsiusHeader></CelsiusHeader>
			<Content>
				<List>
					<ListItem itemDivider>
						<Text>Coop Information</Text>
					</ListItem>
					{Object.keys(coopDetailInfo).map((key) => {
						return !isNullOrEmpty(coopDetailInfoMap[key]) ? (
							<ListItem first>
								<Left>
									<Text style={style.label}>{coopDetailInfoMap[key]}</Text>
								</Left>
								<Body>
									<Input disabled style={{ fontSize: 13 }}>
										{coopDetailInfo[key]}
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
						onPress={() => navigation.navigate('AddCoopScreen')}
					>
						<Text>Add User</Text>
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
				</List>
				<View>
					<Button iconLeft full dark onPress={() => confirm()}>
						<Icon type='Octicons' name='check'></Icon>
						<Text>Save</Text>
					</Button>
					<Button iconLeft full warning onPress={() => cancel()}>
						<Icon name='cross' type='Entypo'></Icon>
						<Text>Cancel</Text>
					</Button>

					<Button rounded full iconLeft danger onPress={() => deleteCoop()}>
						<Icon name='trash' type='Entypo'></Icon>
						<Text>Delete</Text>
					</Button>
				</View>
			</Content>
		</Container>
	)
}

export default AddCooperative
