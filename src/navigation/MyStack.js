import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import { QuoteTab } from './QuoteNavigation'
import ViewQuote from '../screens/ViewQuote'
import BuyingScreen from '../screens/Buying'

const Stack = createStackNavigator()

export function MyStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator headerMode='none'>
				<Stack.Screen name='Login' component={Login} />
				<Stack.Screen name='Quote' component={QuoteTab} />
				<Stack.Screen name='ViewQuote' component={ViewQuote} />
				<Stack.Screen name='BuyingScreen' component={BuyingScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}