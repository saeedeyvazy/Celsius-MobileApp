import React, { useState, useEffect } from 'react'
import PickerContainer from '../PickerContainer'
import { Picker, Icon } from 'native-base'
import { getAllCrops, getAllLocalCrop } from '../../../redux/actions/crops'

export default Crop = ({ onValueChange }) => {
	const [cropList, setCropList] = useState([])
	const [selectedCrop, setSelectedCrop] = useState('')

	useEffect(() => {
		const fetchCropList = async () => {
			const result = await getAllLocalCrop()
			setCropList(result)
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
