import { Text, View } from 'react-native'
import Parcel from '../../assets/icons/parcel.svg'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
    


const Basket = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
          <View className="flex-1 justify-center items-center">
            <Parcel width={100} height={100} />
            <Text className="mt-4 font-semibold text-gray-600">Your Cart is Empty</Text>
            <TouchableOpacity
              className="mt-4 px-6 py-3 rounded-full"
              style={{ backgroundColor: '#8E6CEF' }}
              onPress={() => {navigation.navigate("CategoryScreen") }}
            >
              <Text className="text-white font-semibold">Explore Categories</Text>
            </TouchableOpacity>
          </View>
        </View>
  )
}

export default Basket