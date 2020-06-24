import { Icon, Picker } from 'native-base'
import React, { useEffect, useState } from 'react'
import { getAllLocalDistrict } from '../../../redux/actions/district'
import PickerContainer from '../PickerContainer'
import { connect } from 'react-redux'

const District = ({
	onValueChange,
	children,
	districtList,
	getLocalDistrictList,
}) => {
	const [selectedDistrict, setSelectedDistrict] = useState('')

	useEffect(() => {
		const fetchDistrictList = async () => {
			Array.isArray(districtList) && !districtList.length
				? await getLocalDistrictList()
				: null
		}
		fetchDistrictList()
	}, [])

	return (
		<PickerContainer>
			{children}
			<Picker
				mode='dropdown'
				iosIcon={<Icon name='arrow-down' />}
				style={{ width: undefined }}
				selectedValue={selectedDistrict}
				placeholder='Select district'
				onValueChange={(value) => {
					setSelectedDistrict(value)
					onValueChange(value)
				}}
			>
				<Picker.Item label='' value='' />

				{districtList.map((district, index) => (
					<Picker.Item label={district} value={district} key={index} />
				))}
			</Picker>
		</PickerContainer>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		getLocalDistrictList: async () => {
			dispatch(await getAllLocalDistrict())
		},
	}
}

const mapStateToProps = (state) => {
	const { districtList } = state
	return { districtList }
}

export default connect(mapStateToProps, mapDispatchToProps)(District)
