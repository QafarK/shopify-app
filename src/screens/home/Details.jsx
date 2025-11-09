import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import api from '../../utils/axios';
const DetailsScreen = () => {
  const route = useRoute();
  const { itemId } = route.params || {}; 
  const [item, setItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

 useEffect(() => {
  if (!itemId) return;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      console.log("Axios response data:", res.data);

      const productsArray = res.data.products || res.data; 
      const foundItem = productsArray.find(
        p => p._id?.toString() === itemId?.toString()
      );

      setItem(foundItem);
      setProducts(productsArray);
    } catch (error) {
      console.log('Axios fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [itemId]);


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#8E6CEF" />
        <Text className="mt-2 text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg font-semibold text-gray-700">Item not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        {/* Product Image */}
        <Image
          resizeMode="contain"
          className="w-full h-[280px] rounded-2xl bg-zinc-200"
          source={{ uri: item.image || item.images?.[0] }}
        />

        {/* Product Title & Price */}
        <Text className="font-semibold text-2xl mt-3">{item.title}</Text>
        <Text className="text-xl text-violet-700 font-semibold mt-1">${item.price}</Text>

        {/* Quantity Selector */}
        <View className="flex-row items-center justify-between mt-3 bg-gray-100 rounded-xl px-3 py-2">
          <Text className="text-base font-medium">Quantity</Text>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => setQuantity(q => q + 1)}
              className="p-2 rounded-full"
              style={{ backgroundColor: '#8E6CEF' }}
            >
              <Icon name="plus" size={18} color="white" />
            </TouchableOpacity>

            <Text className="text-lg font-semibold">{quantity}</Text>

            <TouchableOpacity
              onPress={() => setQuantity(q => Math.max(1, q - 1))}
              className="p-2 rounded-full"
              style={{ backgroundColor: '#8E6CEF' }}
            >
              <Icon name="minus" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View className="mt-5">
          <Text className="text-gray-600 leading-6">{item.description || "No description available."}</Text>
        </View>

        {/* Similar Items */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-semibold text-lg">Similar Items</Text>
            <Text className="text-violet-600 font-medium">See All</Text>
          </View>

          <FlatList
            horizontal
            data={products.filter(p => p.id !== item.id && p._id !== item._id)}
            keyExtractor={p => p.id?.toString() || p._id?.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: similar }) => (
              <View className="mr-4 bg-gray-100 rounded-xl p-3 w-[150px]">
                <Image
                  source={{ uri: similar.image || similar.images?.[0] }}
                  className="w-full h-[100px] rounded-lg bg-zinc-300"
                />
                <Text numberOfLines={1} className="font-medium mt-2">
                  {similar.title}
                </Text>
                <Text className="text-sm text-gray-500">${similar.price}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Add to Bag Button */}
      <View className="flex-row items-center justify-between px-5 py-4 border-t border-gray-200">
        <Text className="text-xl font-semibold">${(item.price * quantity).toFixed(2)}</Text>
        <TouchableOpacity className="bg-violet-600 py-3 px-8 rounded-2xl">
          <Text className="text-white font-semibold text-base">Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsScreen;
