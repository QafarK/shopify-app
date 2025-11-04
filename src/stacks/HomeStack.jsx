import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../screens/home/Homepage';
import Details from '../screens/home/Details';

import Categories from '../screens/home/Categories';
import Basket from '../screens/home/Basket';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={Homepage} />
            <Stack.Screen options={{animation: 'none'}} name="DetailsScreen" component={Details} />
            <Stack.Screen name="CategoriesScreen" component={Categories} />
            <Stack.Screen name="BasketScreen" component={Basket} />
        </Stack.Navigator>
    )
}

export default HomeStack