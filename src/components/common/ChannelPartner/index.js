import { Icon, Picker } from 'native-base'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllLocalChannelPartner } from '../../../redux/actions/channelPartner'
import PickerContainer from '../PickerContainer'

const ChannelPartner = ({
	onValueChange,
	children,
	hasPlaceholder,
	channelPartnerList,
	getLocalChannelPartnerList,
}) => {
	const [selectedChannelPartner, setSelectedChannelPartner] = useState('')

	useEffect(() => {
		const fetchChannelPartnerList = async () => {
			channelPartnerList.length == 0 ? getLocalChannelPartnerList() : null
		}
		fetchChannelPartnerList()
	}, [])

	return (
		<PickerContainer>
			{children}
			<Picker
				mode='dropdown'
				iosIcon={<Icon name='arrow-down' />}
				style={{ width: undefined }}
				selectedValue={selectedChannelPartner}
				onValueChange={(value) => {
					setSelectedChannelPartner(value)
					onValueChange(value)
				}}
			>
				<Picker.Item label={hasPlaceholder ? 'ChannelPartner' : ''} value='' />

				{channelPartnerList.map((channelPartner, index) => (
					<Picker.Item
						label={channelPartner}
						value={channelPartner}
						key={index}
					/>
				))}
			</Picker>
		</PickerContainer>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		getLocalChannelPartnerList: async () => {
			dispatch(await getAllLocalChannelPartner())
		},
	}
}

const mapStateToProps = (state) => {
	const { channelPartnerList } = state
	return {
		channelPartnerList,
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ChannelPartner)
