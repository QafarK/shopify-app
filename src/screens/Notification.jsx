import { Text, View } from 'react-native'
import Bell from '../assets/icons/bell.svg'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
    


const Notification = () => {
  const navigation = useNavigation();

  return(
    <View className="flex-1 bg-white">

      <View className="mt-10 items-center">
        <Text className="text-xl font-bold">Notifications</Text>
      </View>


      <View className="flex-1 justify-center items-center">
        <Bell width={100} height={100} />
        <Text className="mt-4 text-gray-600">No Notification yet</Text>
        <TouchableOpacity
          className="mt-4 px-6 py-3 rounded-full"
          style={{ backgroundColor: '#8E6CEF' }}
          onPress={() => {navigation.navigate("HomeScreen") }}
        >
          <Text className="text-white font-semibold">Explore Products</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Notification