import { Icon, Picker } from 'native-base'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllLocalSeason } from '../../../redux/actions/season'
import PickerContainer from '../PickerContainer'

const Season = ({ onValueChange, seasonList, getLocalSeasonList }) => {
	const [selectedSeason, setSelectedSeason] = useState('')

	useEffect(() => {
		const fetchSeasonList = async () => {
			console.log(seasonList)
			Array.isArray(seasonList) && !seasonList.length
				? await getLocalSeasonList()
				: null
		}
		fetchSeasonList()
	}, [])

	return (
		<PickerContainer>
			<Picker
				mode='dropdown'
				iosIcon={<Icon name='arrow-down' />}
				style={{ width: undefined }}
				selectedValue={selectedSeason}
				onValueChange={(value) => {
					setSelectedSeason(value)
					onValueChange(value)
				}}
			>
				<Picker.Item label='Season' value='' />

				{seasonList.map((item, index) => (
					<Picker.Item label={item.name} value={item.name} key={index} />
				))}
			</Picker>
		</PickerContainer>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		getLocalSeasonList: async () => {
			dispatch(await getAllLocalSeason())
		},
	}
}

const mapStateToProps = (state) => {
	const { seasonList } = state
	return {
		seasonList,
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Season)
