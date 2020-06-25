import {
	Body,
	Button,
	Container,
	Content,
	Header,
	Icon,
	Input,
	Item,
	Left,
	List,
	ListItem,
	Right,
	Text,
	Thumbnail,
} from 'native-base'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getDownloadedCoop } from '../../redux/actions/coop'

const Cooperative = ({ navigation, coopList, getDownloadedCoopList }) => {
	const navigateToViewCooperative = (coop) => {
		navigation.navigate('AddViewCoopScreen', {
			coopDetailInfo: coop,
		})
	}

	useEffect(() => {
		const fetchAllCoop = async () => {
			Array.isArray(coopList) && !coopList.length
				? await getDownloadedCoopList()
				: null
		}
		fetchAllCoop()
	}, [])

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

const mapDispatchToProps = (dispatch) => {
	return {
		getDownloadedCoopList: async () => {
			dispatch(await getDownloadedCoop())
		},
	}
}

const mapStateToProps = (state) => {
	const { coopList } = state
	return { coopList }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cooperative)
