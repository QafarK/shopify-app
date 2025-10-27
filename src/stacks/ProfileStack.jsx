import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileScreen" component={Profile} />
        </Stack.Navigator>
    )
}

export default ProfileStack