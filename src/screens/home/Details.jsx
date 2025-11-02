
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import React from 'react'

const Details = () => {
  const products = [
    {
      id: 1,
      title: "Men's Harrington Jacket",
      category: 'Hoodies',
      image: 'https://m.media-amazon.com/images/I/512zSxD04SL._AC_UY1000_.jpg',
      price: 148,
      description:
        "Built for life and made to last, this full-zip corduroy jacket is part of our Nike Life collection. The spacious fit gives you plenty of room to layer underneath, while the soft corduroy keeps it casual and timeless.",
    },
    {
      id: 2,
      title: "Max Cirro Men's Slides",
      category: 'Shoes',
      image: 'https://www.permanentstyle.com/wp-content/uploads/2023/08/rondini-sandals-style.jpg',
      price: 65,
    },
    {
      id: 3,
      title: "Men's Harrington Jacket",
      category: 'Hoodies',
      image: 'https://www.johnpartridge.com/cdn/shop/files/mens-harrington-jacket-navy.png?v=1747647869',
      price: 75,
    },
    {
      id: 4,
      title: "Men's Casual T-Shirt",
      category: 'T-Shirts',
      image: 'https://m.media-amazon.com/images/I/512zSxD04SL._AC_UY1000_.jpg',
      price: 35,
    },
  ];

  const route = useRoute();
  const { itemId } = route.params;
  const item = products.find(product => product.id.toString() === itemId.toString());

  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text>Item not found.</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-white'>
      <ScrollView className='flex-1 p-4'>
        {/* Product Image */}
        <Image
          resizeMode='contain'
          className='w-full h-[280px] rounded-2xl bg-zinc-200'
          source={{ uri: item.image }}
        />

        {/* Product Title */}
        <Text className='font-semibold text-2xl mt-3'>{item.title}</Text>
        <Text className='text-xl text-violet-700 font-semibold mt-1'>${item.price}</Text>

        {/* Quantity Selector */}
        <View className='flex-row items-center justify-between mt-3 bg-gray-100 rounded-xl px-3 py-2'>
          <Text className='text-base font-medium'>Quantity</Text>
          <View className='flex-row items-center gap-3'>
            <TouchableOpacity
            onPress={() => setQuantity(q => q + 1)}
            className=' p-2 rounded-full' style={{backgroundColor: '#8E6CEF'}}
          >
            <Icon name="plus" size={18} color="black" />
          </TouchableOpacity>
          

          <Text className='text-lg font-semibold'>{quantity}</Text>

          <TouchableOpacity
            onPress={() => setQuantity(q => Math.max(1, q - 1))}
            className=' p-2 rounded-full' style={{backgroundColor: '#8E6CEF'}}
          >
            <Icon name="minus" size={18} color="black" />
          </TouchableOpacity>
          

          </View>
        </View>

        {/* Description */}
        <View className='mt-5'>
          <Text className='text-gray-600 leading-6'>{item.description}</Text>
        </View>

        {/* Shipping & Returns */}
        <View className='mt-6'>
          <Text className='font-semibold text-lg'>Shipping & Returns</Text>
          <Text className='text-gray-600 mt-1 leading-6'>
            Free standard shipping and free 30-day returns
          </Text>
        </View>

        {/* Similar Items */}
        <View className='mt-8'>
          <View className='flex-row justify-between items-center mb-2'>
            <Text className='font-semibold text-lg'>Similar Items</Text>
            <Text className='text-violet-600 font-medium'>See All</Text>
          </View>

          <FlatList
            horizontal
            data={products.filter(p => p.id !== item.id)}
            keyExtractor={p => p.id.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className='mr-4 bg-gray-100 rounded-xl p-3 w-[150px]'>
                <Image
                  source={{ uri: item.image }}
                  className='w-full h-[100px] rounded-lg bg-zinc-300'
                />
                <Text numberOfLines={1} className='font-medium mt-2'>
                  {item.title}
                </Text>
                <Text className='text-sm text-gray-500'>${item.price}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Add to Bag Button */}
      <View className='flex-row items-center justify-between px-5 py-4 border-t border-gray-200'>
        <Text className='text-xl font-semibold'>${(item.price * quantity).toFixed(2)}</Text>
        <TouchableOpacity className='bg-violet-600 py-3 px-8 rounded-2xl'>
          <Text className='text-white font-semibold text-base'>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Details;





// import { Image, ScrollView, Text, View } from 'react-native'
// import { useRoute } from '@react-navigation/native'
// import Rectangle1 from '../../assets/icons/Rectangle1.svg'
// import Rectangle2 from '../../assets/icons/Rectangle2.svg'
// import Rectangle3 from '../../assets/icons/Rectangle3.svg'
// import Rectangle4 from '../../assets/icons/Rectangle4.svg'
// const Details = () => {
//   const products = [
//  {
//     id: 1,
//     title: "Men's Harrington Jacket",
//     category: 'Hoodies',
//     image: 'https://m.media-amazon.com/images/I/512zSxD04SL._AC_UY1000_.jpg',
//     price: 120
//   },
//   {
//     id: 2,
//     title: "Max Cirro Men's Slides",
//     category: 'Shoes',
//     image: 'https://www.permanentstyle.com/wp-content/uploads/2023/08/rondini-sandals-style.jpg', 
//     price: 65
//   },
//        {
//     id: 3,
//     title: "Men's Harrington Jacket",
//     category: 'Hoodies',
//     image: 'https://www.johnpartridge.com/cdn/shop/files/mens-harrington-jacket-navy.png?v=1747647869', 
//     price: 75
//   },
//   {
//     id: 4,
//     title: "Men's Casual T-Shirt",
//     category: 'T-Shirts',
//     image: 'https://m.media-amazon.com/images/I/512zSxD04SL._AC_UY1000_.jpg',

//     price: 35
//   },
//   ]

//   const route = useRoute();
//   const { itemId } = route.params

//   const item = products.find(product => product.id.toString() === itemId.toString());

//   return (
//     item ? (
//       <ScrollView className='flex-1 p-4'>
//         <Image resizeMode='contain' className='w-full h-[250px] rounded-lg bg-zinc-200' source={{ uri: item.image }} />

//         <Text className='font-semibold text-2xl mt-3'>{item.title}</Text>
//         <View className='flex-row gap-3 mt-2'>
//           <Text className='bg-yellow-500 p-3 font-semibold rounded-lg'>${item.price}</Text>
//           <Text className='bg-zinc-500 p-3 font-semibold text-white rounded-lg'>{item.category}</Text>
//         </View>
//       </ScrollView>
//     ) : (
//       <View className='flex-1 justify-center items-center'>
//         <Text>Item not found.</Text>
//       </View>
//     )
//   );
// }

// export default Details