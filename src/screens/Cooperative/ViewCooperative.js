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
import style from './styles'

const AddCooperative = ({ navigation, route }) => {
	const {
		members,
		firstName,
		lastName,
		province,
		city,
		tradingName,
	} = route.params.coopDetailInfo
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
					<ListItem first>
						<Left>
							<Text style={style.label}>Name</Text>
						</Left>
						<Body>
							<Input disabled>{tradingName}</Input>
						</Body>
					</ListItem>
					<ListItem>
						<Left>
							<Text style={style.label}>Province - City</Text>
						</Left>
						<Body>
							<Input disabled>
								{province} - {city}
							</Input>
						</Body>
					</ListItem>
					<ListItem>
						<Left>
							<Text style={style.label}>Name</Text>
						</Left>
						<Body>
							<Input disabled>
								{firstName} - {lastName}
							</Input>
						</Body>
					</ListItem>
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
					{members.map((member, index) => (
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
