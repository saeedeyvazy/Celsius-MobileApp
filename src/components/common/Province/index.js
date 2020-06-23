import { Icon, Picker } from 'native-base'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllLocalProvince } from '../../../redux/actions/province'
import PickerContainer from '../PickerContainer'

const Province = ({
	onValueChange,
	children,
	hasPlaceholder,
	provinceList,
	getLocalProvinceList,
}) => {
	const [selectedProvince, setSelectedProvince] = useState('')

	useEffect(() => {
		const fetchProvinceList = async () => {
			provinceList.length == 0 ? getLocalProvinceList() : null
		}
		fetchProvinceList()
	}, [])

	return (
		<PickerContainer>
			{children}
			<Picker
				mode='dropdown'
				iosIcon={<Icon name='arrow-down' />}
				style={{ width: undefined }}
				selectedValue={selectedProvince}
				onValueChange={(value) => {
					setSelectedProvince(value)
					onValueChange(value)
				}}
			>
				<Picker.Item
					label={hasPlaceholder ? 'Name of province' : ''}
					value=''
				/>

				{provinceList.map((province, index) => (
					<Picker.Item label={province} value={province} key={index} />
				))}
			</Picker>
		</PickerContainer>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		getLocalProvinceList: async () => {
			dispatch(await getAllLocalProvince())
		},
	}
}

const mapStateToProps = (state) => {
	const { provinceList } = state
	return {
		provinceList,
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Province)
