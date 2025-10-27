import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useMMKVBoolean } from 'react-native-mmkv';
import StyledView from '../components/StyledView';

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useMMKVBoolean('isAuthenticated');

  return (
    <StyledView>
      <View className={`justify-center items-center`}>
        <TouchableOpacity className='w-full bg-red-600 px-5 py-2.5 mt-5' onPress={() => {
          setIsAuthenticated(false);
        }}>
          <Text className='text-white text-xl font-medium text-center'>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </StyledView>
  )
}

export default Profile
