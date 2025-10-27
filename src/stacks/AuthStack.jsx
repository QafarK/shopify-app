import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login.jsx';
import Register from '../screens/Register.jsx';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={Login} />
            <Stack.Screen name="RegisterScreen" component={Register} />
        </Stack.Navigator>
    )
}

export default AuthStack