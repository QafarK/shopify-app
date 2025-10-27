import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../screens/home/Homepage';
import Details from '../screens/home/Details';
import DiscountedItems from '../screens/home/DiscountedItems';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={Homepage} />
            <Stack.Screen options={{animation: 'none'}} name="DetailsScreen" component={Details} />
            <Stack.Screen name="DiscountedItemsScreen" component={DiscountedItems} />
        </Stack.Navigator>
    )
}

export default HomeStack