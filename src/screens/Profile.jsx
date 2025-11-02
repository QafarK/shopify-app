import { Text, TouchableOpacity, View } from 'react-native'
import { useMMKVBoolean } from 'react-native-mmkv';
import StyledView from '../components/StyledView';
import ProfilePhoto from '../assets/icons/profilePhoto';
const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useMMKVBoolean('isAuthenticated');

  return (
    <StyledView>
      <View className={` flex-1 justify-between items-center p-6`}>

<View className=' w-full items-center mt-10 space-y-8'>  

<View className=' mb-8'>  
        <ProfilePhoto width={82} height={82} />
</View>

            <View className=" w-full">
  
        <TouchableOpacity
          className="p-4 mb-3 rounded-lg"
          style={{ backgroundColor: '#f3f3f3' }}
        >
          <Text className="text-lg font-medium text-gray-700">Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="p-4 rounded-lg"
          style={{ backgroundColor: '#f3f3f3' }}
        >
          <Text className="text-lg font-medium text-gray-700">
            Terms & Conditions
          </Text>
        </TouchableOpacity>

            </View>

</View>


        <TouchableOpacity className=' w-full  px-5 py-2.5 mt-5' onPress={() => {
          setIsAuthenticated(false);
        }}>
          <Text className='text-red-500 text-xl font-medium text-center'>
            Sign Out
          </Text>
        </TouchableOpacity>


      </View>
    </StyledView>
  )
}

export default Profile
