import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import NotificationStack from './NotificationStack';
import FavoriteStack from './FavoriteStack';
import React from 'react';

const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Notification" component={NotificationStack} />
            <Tab.Screen name="Favorite" component={FavoriteStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
    )
}

export default TabStack