import {
	Button,
	Container,
	Content,
	Header,
	Icon,
	Input,
	Item,
	List,
	Text,
} from 'native-base'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ClientComponent from '../../components/common/Client'
import {
	getDownloadedClient,
	getAllLocalAndDlnClientList,
} from '../../redux/actions/client'

const Client = ({ navigation, clientList, getDownloadedClientList }) => {
	const navigateToViewClient = (client) => {
		navigation.navigate('AddViewClientScreen', {
			clientDetailInfo: client,
		})
	}

	useEffect(() => {
		const fetchAllClient = async () => {
			Array.isArray(clientList) && !clientList.length
				? await getDownloadedClientList()
				: null
		}
		fetchAllClient()
	}, [])

	return (
		<Container>
			<Header style={{ backgroundColor: 'black' }} searchBar rounded>
				<Item>
					<Icon name='ios-search' />
					<Input placeholder='Search' />
					<Icon
						name='ios-add'
						onPress={() => navigation.navigate('AddClientScreen')}
					/>
				</Item>
				<Button transparent>
					<Text>Search</Text>
				</Button>
			</Header>
			<Content>
				<List>
					{clientList.map((client, index) => {
						const { firstName, lastName, city, province } = client
						return (
							<ClientComponent
								firstName={firstName}
								lastName={lastName}
								city={city}
								province={province}
								navigateToViewClient={() => navigateToViewClient(client)}
								key={index}
							></ClientComponent>
						)
					})}
				</List>
			</Content>
		</Container>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		getDownloadedClientList: async () => {
			dispatch(await getAllLocalAndDlnClientList())
		},
	}
}

const mapStateProps = (state) => {
	const { clientList } = state
	return {
		clientList,
	}
}

export default connect(mapStateProps, mapDispatchToProps)(Client)
