import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notification from '../screens/Notification';

const Stack = createNativeStackNavigator();

const NotificationStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NotificationScreen" component={Notification} />
        </Stack.Navigator>
    )
}

export default NotificationStack