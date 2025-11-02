import { Text, FlatList, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Categories = () => {
    const navigation = useNavigation();

const categories = [
  {
    id: 1,
    title: 'Hoodies',
    icon: 'tshirt-crew',        
  },
  {
    id: 2,
    title: 'Shorts',
    icon: 'human-male',         
  },
  {
    id: 3,
    title: 'Shoes',
    icon: 'shoe-sneaker',       
  },
  {
    id: 4,
    title: 'Bag',
    icon: 'bag-personal',       
  },
   {
    id: 5,
    title: 'Accessories',
    icon: 'watch-variant',     
  }
];

    return (
        <View>
            <View className='flex-row items-center justify-between px-4 mt-4 mb-2'>
                    <Text className='text-xl font-semibold'>Categories</Text>
                        <TouchableOpacity onPress={() => {navigation.navigate("CategoriesScreen")}}>
                            <Text className='color-gray-800'>See All</Text>
                        </TouchableOpacity>
            </View>

            <FlatList
                data={categories}
    numColumns={categories.length}
    scrollEnabled={false} 
    contentContainerClassName="px-2"
    renderItem={({ item }) => (
        <View className="flex-1 items-center justify-center p-1 ">
        <TouchableOpacity className="w-16 h-16 bg-gray-200 rounded-full items-center justify-center">
            <MaterialCommunityIcons name={item.icon} size={28} color="#8E6CEF" />
        </TouchableOpacity>

        <Text className="mt-2 text-sm text-center">{item.title}</Text>
        </View>
                    )}
            />
        </View>
    )
}

export default Categories