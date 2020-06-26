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
	Text,
	View,
} from 'native-base'
import React from 'react'
import CelsiusHeader from '../../components/common/CelsiusHeader'
import { clientDetailInfoMap } from '../../utility/apiResponseMap'

const AddViewClient = ({ navigation, route }) => {
	return (
		<Container>
			<CelsiusHeader></CelsiusHeader>
			<Content>
				<List>
					<ListItem itemDivider>
						<Text>Client Details Information</Text>
					</ListItem>
					{Object.keys(route.params.clientDetailInfo).map((key) => (
						<ListItem>
							<Left>
								<Text style={{ color: '#00008b' }}>
									{clientDetailInfoMap[key]}
								</Text>
							</Left>
							<Body>
								<Input editable={false} style={{ fontSize: 13 }}>
									{route.params.clientDetailInfo[key]}
								</Input>
							</Body>
						</ListItem>
					))}
				</List>
			</Content>
			<View>
				<Button
					rounded
					full
					iconLeft
					warning
					onPress={() => navigation.navigate('Client')}
				>
					<Icon name='cross' type='Entypo'></Icon>
					<Text>Cancel</Text>
				</Button>
			</View>
		</Container>
	)
}

export default AddViewClient
