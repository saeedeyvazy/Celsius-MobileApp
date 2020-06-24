import React from 'react'
import {
	Container,
	Header,
	Button,
	Icon,
	Input,
	Content,
	List,
	Left,
	Thumbnail,
	Body,
	Text,
	Item,
	ListItem,
	Right,
} from 'native-base'
import { connect } from 'react-redux'

const Cooperative = ({ navigation, coopList }) => {
	const navigateToViewCooperative = (coop) => {
		navigation.navigate('AddViewCoopScreen', {
			coopDetailInfo: coop,
		})
	}

	return (
		<Container>
			<Header style={{ backgroundColor: 'black' }} searchBar rounded>
				<Item>
					<Icon name='ios-search' />
					<Input placeholder='Search' />
					<Icon
						name='ios-add'
						onPress={() => navigation.navigate('AddCoopScreen')}
					/>
				</Item>
				<Button transparent>
					<Text>Search</Text>
				</Button>
			</Header>
			<Content>
				<List>
					<ListItem itemDivider>
						<Text>Cooperative - Creation and assigning Clients</Text>
					</ListItem>
					{coopList.map((coop, index) => (
						<ListItem thumbnail key={index}>
							<Left>
								<Thumbnail
									circular
									source={require('../../img/primeo-coop.png')}
								/>
							</Left>
							<Body>
								<Text>{coop.title}</Text>
								<Text note numberOfLines={1}>
									{`${coop.firstName} - ${coop.lastName}`}
								</Text>
							</Body>
							<Right>
								<Button
									transparent
									onPress={() => navigateToViewCooperative(coop)}
								>
									<Text>View</Text>
								</Button>
							</Right>
						</ListItem>
					))}
				</List>
			</Content>
		</Container>
	)
}

const mapStateToProps = (state) => {
	const { coopList } = state
	return { coopList }
}

export default connect(mapStateToProps)(Cooperative)
