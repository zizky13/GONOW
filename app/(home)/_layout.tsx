import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="home" options={{headerShown: false}}/>
        <Tabs.Screen name="locationBased" options={{headerShown: false}}/>
    </Tabs>
  )
}

export default _layout