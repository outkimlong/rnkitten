import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KittenList, KittenView } from './src/screen/index';

    const Stack = createNativeStackNavigator();
    const App = () => {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="KittenList" component={KittenList} 
                        options={{
                            title: 'Kitten List'
                        }}
                    />
                    <Stack.Screen name="KittenView" component={KittenView} 
                        options={{
                            title: 'Kitten View',
                            headerBackTitleVisible: false,
                            headerShadowVisible: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
export default App;