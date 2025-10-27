import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import TabStack from './TabStack';
import { useMMKVBoolean } from 'react-native-mmkv';

const Stack = createNativeStackNavigator();

const Navigator = () => {
     const [isAuthenticated, setIsAuthenticated] = useMMKVBoolean('isAuthenticated');

     const linking = {
        prefixes: ['shopify://'],
        config: {
            screens: {
                Tab: {
                    path: 'tab',
                    initialRouteName: 'Home',
                    screens: {
                        Home: {
                            path: 'home',
                            initialRouteName: 'HomeScreen',
                            screens: {
                                HomeScreen: {
                                    path: 'main',
                                },
                                DetailsScreen: {
                                    path: 'details/:itemId?',
                                },
                            },
                        },

                        Notification: {
                            path: 'notification',
                            screens: {
                                NotificationScreen: {
                                    path: 'main',
                                },
                                NotificationDetailsScreen: {
                                    path: 'details/:id?',
                                },
                            },
                        },
                       
                        Favorite: {
                            path: 'favorite',
                            initialRouteName: 'FavoriteScreen',
                            screens: {
                                FavoriteScreen: {
                                    path: 'main',
                                },
                                FavoriteDetailsScreen: {
                                    path: 'details/:itemId?',
                                },
                            },
                        },

                        Profile: {
                            path: 'profile',
                            initialRouteName: 'ProfileScreen',
                            screens: {
                                ProfileScreen: {
                                    path: 'main',
                                },
                            },
                        },
                    },
                },            
            },
        },
    };


    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                {isAuthenticated ? <Stack.Screen name="Tab" component={TabStack} /> : <Stack.Screen name="Auth" component={AuthStack} />}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator