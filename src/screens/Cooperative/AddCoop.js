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
import CelsiusHeader from '../../components/common/CelsiusHeader'
import CelsiusInput from '../../components/common/CelsiusInput'
import District from '../../components/common/District'
import Province from '../../components/common/Province'
import { addCoop, getAllLocalAndDlnCoopList } from '../../redux/actions/coop'
import { isNullOrEmpty } from '../../utility/string'
import uuid from 'react-native-uuid'
import { connect } from 'react-redux'
import ContactMethod from '../../components/common/ContactMethod'

const AddCoop = ({ navigation, getAllDnlLocalCoopList }) => {
	const isFillAllRequiredField = () => {
		const isFillFirstName = !isNullOrEmpty(firstName)
		const isFillLastName = !isNullOrEmpty(lastName)
		const isFillMobileMoney = !isNullOrEmpty(mobileMoneyNumber)
		const isFillProvince = !isNullOrEmpty(province)
		const isFillDistrict = !isNullOrEmpty(district)
		const isFillTitle = !isNullOrEmpty(title)
		const isFillMobile = !isNullOrEmpty(mobileNumber)
		const isPhysAddress = !isNullOrEmpty(physAddress)

		return (
			isFillFirstName &&
			isFillLastName &&
			isFillProvince &&
			isFillDistrict &&
			isFillTitle &&
			isFillMobile &&
			isFillMobileMoney &&
			isPhysAddress
		)
	}

	const confirm = async () => {
		if (isFillAllRequiredField()) {
			setRequiredFieldAlertShow(false)
			setSaveCoopAlertShow(true)
		} else {
			setSaveCoopAlertShow(false)
			setRequiredFieldAlertShow(true)
		}
	}
	const [tradeName, setTradeName] = useState('')
	const [vatNumber, setVatNumber] = useState('')
	const [regNumber, setRegNumber] = useState('')
	const [title, setTitle] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [province, setProvince] = useState('')
	const [district, setDistrict] = useState('')
	const [contactMethod, setContactMethod] = useState('')
	const [mobileNumber, setMobileNumber] = useState('')
	const [physAddress, setPhysAddress] = useState('')
	const [city, setCity] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [mobileMoneyNumber, setMobileMoneyNumber] = useState('')
	const [saveCoopAlertShow, setSaveCoopAlertShow] = useState(false)
	const [saveCoopSuccAlertShow, setSaveCoopSuccAlertShow] = useState(false)
	const [requiredFieldAlertShow, setRequiredFieldAlertShow] = useState(false)

	const save = async () => {
		setSaveCoopAlertShow(false)
		await addCoop({
			tradingName: tradeName,
			firstName,
			lastName,
			city,
			registration: regNumber,
			vatNumber,
			title,
			province,
			district,
			email,
			district,
			mobileNumber,
			physAddress,
			mobileMoneyNumber,
			contactMethod,
			postalCode,
			regionId: 3,
			id: uuid.v1(),
			members: [],
		})
		setTimeout(() => setSaveCoopSuccAlertShow(true), 1000)
		await getAllDnlLocalCoopList()
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
						label='Trading name'
						onChangeText={(value) => setTradeName(value)}
						value={tradeName}
					></CelsiusInput>
					<CelsiusInput
						label='Registeration number'
						onChangeText={(value) => setRegNumber(value)}
						value={regNumber}
						keyboardType='numeric'
					></CelsiusInput>
					<CelsiusInput
						label='VAT number'
						onChangeText={(value) => setVatNumber(value)}
						value={vatNumber}
					></CelsiusInput>
					<CelsiusInput
						label='Title'
						required
						onChangeText={(value) => setTitle(value)}
						value={title}
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
					<District onValueChange={(value) => setDistrict(value)}>
						<Label style={{ fontSize: 14, marginLeft: 10, marginTop: 14 }}>
							District
							<Icon name='star' style={{ fontSize: 9, color: 'red' }}></Icon>
						</Label>
					</District>
					<ContactMethod
						onValueChange={(value) => setContactMethod(value)}
					></ContactMethod>
					<CelsiusInput
						required
						label='Mobile number'
						onChangeText={(value) => setMobileNumber(value)}
						value={mobileNumber}
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
						onChangeText={(value) => setMobileMoneyNumber(value)}
						value={mobileMoneyNumber}
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
					onPress={() => navigation.navigate('Coop')}
				>
					<Icon name='cross' type='Entypo'></Icon>
					<Text>Cancel</Text>
				</Button>
				<Button
					rounded
					full
					iconLeft
					danger
					onPress={() => navigation.navigate('Coop')}
				>
					<Icon name='trash' type='Entypo'></Icon>
					<Text>Delete</Text>
				</Button>
			</View>
			<AwesomeAlert
				show={saveCoopAlertShow}
				showProgress={false}
				title='Add Cooperative'
				message='Are you sure you want to save cooperative?'
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={true}
				showCancelButton={true}
				showConfirmButton={true}
				cancelText='No, cancel'
				confirmText='Yes, save it'
				confirmButtonColor='#DD6B55'
				onCancelPressed={() => {
					setSaveCoopAlertShow(false)
				}}
				onConfirmPressed={() => save()}
				messageStyle={{ textAlign: 'center' }}
			/>
			<AwesomeAlert
				show={saveCoopSuccAlertShow}
				showProgress={false}
				title='Cooperative'
				message='Added Coop saved Successfully!'
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={true}
				showConfirmButton={true}
				confirmText='   OK   '
				confirmButtonColor='#DD6B55'
				onConfirmPressed={() => {
					setSaveCoopSuccAlertShow(false)
					navigation.navigate('Coop')
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
		getAllDnlLocalCoopList: async () => {
			dispatch(await getAllLocalAndDlnCoopList())
		},
	}
}

export default connect(null, mapDispatchToProps)(AddCoop)
