import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorite from '../screens/favorite/Favorite';

const Stack = createNativeStackNavigator();


const FavoriteStack = () => {
return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FavoriteScreen" component={Favorite} />
        </Stack.Navigator>
    )
}

export default FavoriteStack