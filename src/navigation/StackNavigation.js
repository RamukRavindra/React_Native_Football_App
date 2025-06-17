import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';

const Stack = createStackNavigator();

export default function StackNavigation() {
    return (
        <Stack.Navigator initialRouteName='Login' >
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Dashboard' component={Dashboard}
                options={{
                    headerStyle: {
                        backgroundColor: '#009999'
                    },
                    headerTitleAllowFontScaling: false,
                    headerBackAllowFontScaling: false,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: null
                }}
            />
        </Stack.Navigator>
    )
}