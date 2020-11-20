import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {createSharedElementStackNavigator } from 'react-navigation-shared-element'

import HomeScreen from './app/screens/HomeScreen'
import DetailsScreen from './app/screens/DetailsScreen'

const RootStack = createSharedElementStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="home" component={HomeScreen}/>
        <RootStack.Screen
          name="detail"
          component={DetailsScreen}
          options={{
            gestureEnabled: false,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 800 } },
              close: { animation: 'timing', config: { duration: 800 } },
            },
            cardStyleInterpolator: ({ current }) => {
              return {
                cardStyle: {
                  opacity: current.progress,
                },
              };
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
