import {
	Button,
	Container,
	Content,
	Form,
	Icon,
	Label,
	Text,
	View,
} from 'native-base'
import React, { useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'
import { connect } from 'react-redux'
import Calendar from '../../components/common/Calendar'
import CelsiusHeader from '../../components/common/CelsiusHeader'
import CelsiusInput from '../../components/common/CelsiusInput'
import District from '../../components/common/District'
import Gender from '../../components/common/Gender'
import Province from '../../components/common/Province'
import {
	addClient,
	getAllLocalAndDlnClientList,
} from '../../redux/actions/client'
import { isNullOrEmpty } from '../../utility/string'
import ChannelPartner from '../../components/common/ChannelPartner'
import Company from '../../components/common/Company'
import uuid from 'react-native-uuid'
import ContactMethod from '../../components/common/ContactMethod'

const AddClient = ({ navigation, getAllLocalDnlClientList }) => {
	const isFillAllRequiredField = () => {
		const isFillFirstName = !isNullOrEmpty(firstName)
		const isFillLastName = !isNullOrEmpty(lastName)
		const isFillMobileMoney = !isNullOrEmpty(mobileMoney)
		const isFillProvince = !isNullOrEmpty(province)
		const isFillDistrict = !isNullOrEmpty(district)
		const isFillBirthDate = !isNullOrEmpty(birthDate)
		const isFillIdNumber = !isNullOrEmpty(idNumber)
		const isFillTitle = !isNullOrEmpty(title)
		const isFillMobile = !isNullOrEmpty(mobile)
		const isPhysAddress = !isNullOrEmpty(physAddress)

		return (
			isFillFirstName &&
			isFillLastName &&
			isFillProvince &&
			isFillDistrict &&
			isFillBirthDate &&
			isFillIdNumber &&
			isFillTitle &&
			isFillMobile &&
			isFillMobileMoney &&
			isPhysAddress
		)
	}

	const confirm = async () => {
		if (isFillAllRequiredField()) {
			setRequiredFieldAlertShow(false)
			setSaveClientAlertShow(true)
		} else {
			setSaveClientAlertShow(false)
			setRequiredFieldAlertShow(true)
		}
	}
	const [channelPartner, setChannelPartner] = useState('')
	const [Vatnumber, setVatNumber] = useState('')
	const [regNumber, setRegNumber] = useState('')
	const [title, setTitle] = useState('')
	const [init, setInit] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [occupation, setOccupation] = useState('')
	const [birthDate, setBirthDate] = useState('')
	const [email, setEmail] = useState('')
	const [province, setProvince] = useState('')
	const [district, setDistrict] = useState('')
	const [ethnicGroup, setEthnicGroup] = useState('')
	const [contactMethod, setContactMethod] = useState('')
	const [mobile, setMobile] = useState('')
	const [physAddress, setPhysAddress] = useState('')
	const [city, setCity] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [mobileMoney, setMobileMoney] = useState('')
	const [idNumber, setIdNumber] = useState('')
	const [insuranceCompany, setInsuranceCompany] = useState('')

	const [saveClientAlertShow, setSaveClientAlertShow] = useState(false)
	const [saveClientSuccAlertShow, setSaveClientSuccAlertShow] = useState(false)
	const [requiredFieldAlertShow, setRequiredFieldAlertShow] = useState(false)

	const save = async () => {
		setSaveClientAlertShow(false)
		await addClient({
			channelPartner,
			Vatnumber,
			registrationNumber: regNumber,
			title,
			init,
			firstName,
			lastName,
			occupation,
			birthDate,
			email,
			province,
			district,
			ethnicGroup,
			contactMethod,
			mobileNumber: mobile,
			physAddress,
			city,
			postalCode,
			mobileMoney,
			idNumber,
			regionId: 3,
			insuranceCompany,
			id: uuid.v1(),
		})
		await getAllLocalDnlClientList()

		setTimeout(() => setSaveClientSuccAlertShow(true), 1000)
	}

	return (
		<Container>
			<CelsiusHeader></CelsiusHeader>
			<Content>
				<Form
					style={{
						alignItems: 'center',
					}}
				>
					<CelsiusInput
						label='Registeration number'
						onChangeText={(value) => setRegNumber(value)}
						value={regNumber}
						keyboardType='numeric'
					></CelsiusInput>
					<CelsiusInput
						label='VAT number'
						onChangeText={(value) => setVatNumber(value)}
						value={Vatnumber}
					></CelsiusInput>
					<CelsiusInput
						label='Title'
						required
						onChangeText={(value) => setTitle(value)}
						value={title}
					></CelsiusInput>
					<CelsiusInput
						label='Initials'
						onChangeText={(value) => setInit(value)}
						value={init}
					></CelsiusInput>
					<CelsiusInput
						required
						label='First name'
						onChangeText={(value) => setFirstName(value)}
						value={firstName}
					></CelsiusInput>
					<CelsiusInput
						required
						label='Last name'
						onChangeText={(value) => setLastName(value)}
						value={lastName}
					></CelsiusInput>
					<CelsiusInput
						required
						label='Id number'
						onChangeText={(value) => setIdNumber(value)}
						value={idNumber}
						keyboardType='numeric'
					></CelsiusInput>
					<CelsiusInput
						label='Email'
						onChangeText={(value) => setEmail(value)}
						value={email}
						placeholder='example@gmail.com'
					></CelsiusInput>
					<Province onValueChange={(value) => setProvince(value)}>
						<Label style={{ fontSize: 14, marginLeft: 10, marginTop: 14 }}>
							Region
							<Icon name='star' style={{ fontSize: 9, color: 'red' }}></Icon>
						</Label>
					</Province>
					<ChannelPartner onValueChange={(value) => setChannelPartner(value)}>
						<Label style={{ fontSize: 14, marginLeft: 10, marginTop: 14 }}>
							Channel Partner
						</Label>
					</ChannelPartner>
					<Company onValueChange={(value) => setInsuranceCompany(value)}>
						<Label style={{ fontSize: 14, marginLeft: 10, marginTop: 14 }}>
							Insurance Partner
						</Label>
					</Company>
					<District onValueChange={(value) => setDistrict(value)}>
						<Label style={{ fontSize: 14, marginLeft: 10, marginTop: 14 }}>
							District
							<Icon name='star' style={{ fontSize: 9, color: 'red' }}></Icon>
						</Label>
					</District>

					<Calendar
						required
						label='Date of Birth'
						onValueChange={(value) => setBirthDate(value)}
					></Calendar>
					<CelsiusInput
						label='Occupation'
						onChangeText={(value) => setOccupation(value)}
						value={occupation}
					></CelsiusInput>
					<Gender></Gender>
					<ContactMethod
						onValueChange={(value) => setContactMethod(value)}
					></ContactMethod>
					<CelsiusInput
						label='Ethnic group'
						onChangeText={(value) => setEthnicGroup(value)}
						value={ethnicGroup}
					></CelsiusInput>

					<CelsiusInput
						required
						label='Mobile number'
						onChangeText={(value) => setMobile(value)}
						value={mobile}
					></CelsiusInput>
					<CelsiusInput
						required
						label='Physical Address'
						onChangeText={(value) => setPhysAddress(value)}
						value={physAddress}
					></CelsiusInput>
					<CelsiusInput
						label='City'
						onChangeText={(value) => setCity(value)}
						value={city}
					></CelsiusInput>
					<CelsiusInput
						label='Postal code'
						onChangeText={(value) => setPostalCode(value)}
						value={postalCode}
						keyboardType='numeric'
					></CelsiusInput>
					<CelsiusInput
						required
						label='Mobile money number'
						onChangeText={(value) => setMobileMoney(value)}
						value={mobileMoney}
						keyboardType='numeric'
					></CelsiusInput>
				</Form>
			</Content>
			<View>
				<Button iconLeft full dark onPress={() => confirm()}>
					<Icon type='Octicons' name='check'></Icon>
					<Text>Save</Text>
				</Button>
				<Button
					iconLeft
					full
					warning
					onPress={() => navigation.navigate('Client')}
				>
					<Icon name='cross' type='Entypo'></Icon>
					<Text>Cancel</Text>
				</Button>
				<Button
					rounded
					full
					iconLeft
					danger
					onPress={() => navigation.navigate('Client')}
				>
					<Icon name='trash' type='Entypo'></Icon>
					<Text>Delete</Text>
				</Button>
			</View>
			<AwesomeAlert
				show={saveClientAlertShow}
				showProgress={false}
				title='Add Client'
				message='Are you sure to save client?'
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={true}
				showCancelButton={true}
				showConfirmButton={true}
				cancelText='No, cancel'
				confirmText='Yes, save it'
				confirmButtonColor='#DD6B55'
				onCancelPressed={() => setSaveClientAlertShow(false)}
				onConfirmPressed={() => save()}
				messageStyle={{ textAlign: 'center' }}
			/>
			<AwesomeAlert
				show={saveClientSuccAlertShow}
				showProgress={false}
				title='Client'
				message='Added Client saved Successfully!'
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={true}
				showConfirmButton={true}
				confirmText='   OK   '
				confirmButtonColor='#DD6B55'
				onConfirmPressed={() => {
					setSaveClientSuccAlertShow(false)
					navigation.navigate('ClientScreen')
				}}
				messageStyle={{ textAlign: 'center' }}
			/>
			<AwesomeAlert
				show={requiredFieldAlertShow}
				showProgress={false}
				title='Required Fields'
				message='Please fill all manatory fields!'
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={true}
				showConfirmButton={true}
				confirmText='      OK        '
				confirmButtonColor='#DD6B55'
				onConfirmPressed={() => setRequiredFieldAlertShow(false)}
				messageStyle={{ textAlign: 'center' }}
			/>
		</Container>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllLocalDnlClientList: async () => {
			dispatch(await getAllLocalAndDlnClientList())
		},
	}
}
export default connect(null, mapDispatchToProps)(AddClient)
