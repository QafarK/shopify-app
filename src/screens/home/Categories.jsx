import { ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  { id: 1, title: 'Hoodies', icon: 'tshirt-crew' },
  { id: 2, title: 'Accessories', icon: 'watch-variant' },
  { id: 3, title: 'Shorts', icon: 'human-male' },
  { id: 4, title: 'Shoes', icon: 'shoe-sneaker' },
  { id: 5, title: 'Bag', icon: 'bag-personal' },
];

const Categories = () => {
  return (
    <ScrollView className='flex-1 bg-white px-4 py-4'>
      <Text className='text-2xl font-bold mb-4'>Shop by Categories</Text>

      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          className='h-20 flex-row items-center bg-gray-100 p-3 rounded-xl mb-6'
          onPress={() => console.log('Selected:', cat.name)}
        >
          <MaterialCommunityIcons name={cat.icon} size={28} color="#8E6CEF" />
          <Text className='text-lg font-semibold text-gray-800 pl-4'>{cat.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Categories;
