import React from 'react'

import { MyStack } from './src/navigation/MyStack'
import reducer from './src/redux/reducer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

console.disableYellowBox = true
const store = createStore(reducer)

export default function App() {
	return (
		<Provider store={store}>
			<MyStack></MyStack>
		</Provider>
	)
}
