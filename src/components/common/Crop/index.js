import React, { useState, useEffect } from 'react'
import PickerContainer from '../PickerContainer'
import { Picker, Icon } from 'native-base'
import { getAllLocalCrop } from '../../../redux/actions/crops'
import { connect } from 'react-redux'

const Crop = ({ onValueChange, cropList, getAllLocalCropList }) => {
	const [selectedCrop, setSelectedCrop] = useState('')

	useEffect(() => {
		const fetchCropList = async () => {
			Array.isArray(cropList) && !cropList.length
				? await getAllLocalCropList()
				: null
		}
		fetchCropList()
	}, [])

	return (
		<PickerContainer>
			<Picker
				mode='dropdown'
				iosIcon={<Icon name='arrow-down' />}
				style={{ width: undefined }}
				selectedValue={selectedCrop}
				onValueChange={(value) => {
					setSelectedCrop(value)
					onValueChange(value)
				}}
			>
				<Picker.Item label='Name of Crop' value='' />

				{cropList.map((item, index) => (
					<Picker.Item label={item.CropName} value={item.CropId} key={index} />
				))}
			</Picker>
		</PickerContainer>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllLocalCropList: async () => {
			dispatch(await getAllLocalCrop())
		},
	}
}

const mapStateToProps = (state) => {
	const { cropList } = state
	return {
		cropList,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Crop)
