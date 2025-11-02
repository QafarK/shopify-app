import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notification from '../screens/Notification';
import Homepage from '../screens/home/Homepage';
const Stack = createNativeStackNavigator();

const NotificationStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NotificationScreen" component={Notification} />
            <Stack.Screen name="HomeScreen" component={Homepage} />

        </Stack.Navigator>
    )
}

export default NotificationStack