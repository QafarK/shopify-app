import { Image, ScrollView, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'

const Details = () => {
  const products = [
    {
      id: 1,
      title: 'Macbook Pro',
      category: 'Tech',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      price: 1999,
      type: 'tech'
    },
    {
      id: 2,
      title: 'Iphone 14 Pro',
      category: 'Tech',
      image: 'https://m.media-amazon.com/images/I/61HHS0HrjpL._UF1000,1000_QL80_.jpg',
      price: 999,
      type: 'tech'
    },
    {
      id: 3,
      title: 'Football',
      category: 'Sports',
      image: 'https://contents.mediadecathlon.com/p2154018/k$62eddd5da1ca0c3add68b47c60eee952/football-size-5-first-kick-for-kids-ages-to-12-years-yellow.jpg',
      price: 49,
      type: 'other'
    },
    {
      id: 4,
      title: 'Pizza',
      category: 'Food',
      image: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Homemade-Pizza_EXPS_FT23_376_EC_120123_3.jpg',
      price: 19,
      type: 'other'
    },
  ]

  const route = useRoute();
  const { itemId } = route.params

  const item = products.find(product => product.id.toString() === itemId.toString());

  return (
    item ? (
      <ScrollView className='flex-1 p-4'>
        <Image resizeMode='contain' className='w-full h-[250px] rounded-lg bg-zinc-200' source={{ uri: item.image }} />

        <Text className='font-semibold text-2xl mt-3'>{item.title}</Text>
        <View className='flex-row gap-3 mt-2'>
          <Text className='bg-yellow-500 p-3 font-semibold rounded-lg'>${item.price}</Text>
          <Text className='bg-zinc-500 p-3 font-semibold text-white rounded-lg'>{item.category}</Text>
        </View>
      </ScrollView>
    ) : (
      <View className='flex-1 justify-center items-center'>
        <Text>Item not found.</Text>
      </View>
    )
  );
}

export default Details