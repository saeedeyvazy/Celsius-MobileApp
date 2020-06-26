import { Icon, Picker } from 'native-base'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllLocalCompany } from '../../../redux/actions/company'
import PickerContainer from '../PickerContainer'

const Company = ({
	onValueChange,
	children,
	hasPlaceholder,
	companyList,
	getCompanyList,
}) => {
	const [selectedCompany, setSelectedCompany] = useState('')

	useEffect(() => {
		const fetchCompanyList = async () => {
			companyList.length == 0 ? getCompanyList() : null
		}
		fetchCompanyList()
	}, [])

	return (
		<PickerContainer>
			{children}
			<Picker
				mode='dropdown'
				iosIcon={<Icon name='arrow-down' />}
				style={{ width: undefined }}
				selectedValue={selectedCompany}
				onValueChange={(value) => {
					setSelectedCompany(value)
					onValueChange(value)
				}}
			>
				<Picker.Item label={hasPlaceholder ? 'Company' : ''} value='' />

				{companyList.map((company, index) => (
					<Picker.Item label={company} value={company} key={index} />
				))}
			</Picker>
		</PickerContainer>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCompanyList: async () => {
			dispatch(await getAllLocalCompany())
		},
	}
}

const mapStateToProps = (state) => {
	const { companyList } = state
	return {
		companyList,
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Company)
