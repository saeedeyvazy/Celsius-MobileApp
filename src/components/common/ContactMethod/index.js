import { Icon, Picker } from 'native-base'
import React, { useState } from 'react'
import PickerContainer from '../PickerContainer'

const ContactMethod = ({ onValueChange }) => {
	const [selectedContact, setSelectedContact] = useState('')

	return (
		<PickerContainer>
			<Picker
				mode='dropdown'
				iosIcon={<Icon name='arrow-down' />}
				style={{ width: undefined }}
				selectedValue={selectedContact}
				onValueChange={(value) => {
					setSelectedContact(value)
					onValueChange(value)
				}}
			>
				<Picker.Item label='Contact Method' value='' />
				<Picker.Item label='Telephone' value='Telephone' />
				<Picker.Item label='Post' value='Post' />
				<Picker.Item label='Email' value='Email' />
			</Picker>
		</PickerContainer>
	)
}

export default ContactMethod
