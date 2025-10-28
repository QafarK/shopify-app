import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import NotificationStack from './NotificationStack';
import FavoriteStack from './FavoriteStack';
import { View } from 'react-native';

import HomeActive from "../assets/icons/homeActive.svg"
import FavoriteActive from "../assets/icons/favoriteActive.svg"
import NotificationActive from "../assets/icons/notificationActive.svg"
import UserActive from "../assets/icons/userActive.svg"

import Home from "../assets/icons/home.svg"
import Favorite from "../assets/icons/favorite.svg"
import Notification from "../assets/icons/notification.svg"
import User from "../assets/icons/user.svg"

const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {height: 40},
            }}>

            <Tab.Screen
            options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                      {focused ? <HomeActive  />  : <Home />}
                   </View>)
            }}
                name="Home" component={HomeStack} />

            <Tab.Screen options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                      {focused ? <NotificationActive  />  : <Notification />}
                   </View>)
            }}
             name="Notification" component={NotificationStack} />

            <Tab.Screen options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                      {focused ? <FavoriteActive  />  : <Favorite />}
                   </View>)
            }}
             name="Favorite" component={FavoriteStack} />

            <Tab.Screen
              options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                      {focused ? <UserActive  />  : <User />}
                   </View>)
            }}
            name="Profile"   component={ProfileStack} />

        </Tab.Navigator>
    )
}

export default TabStack;