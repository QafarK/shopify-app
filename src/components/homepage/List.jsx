import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StyledText from '../StyledText';

const List = ({ data, title }) => {
  const navigation = useNavigation();

  return (
    <>
      <StyledText value={title} className='text-2xl font-semibold ml-4 mb-2 mt-5' />
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
        ListEmptyComponent={() => (
          <View>
            <Text className='text-center mt-5'>No products found</Text>
          </View>
        )}
        renderItem={({ item }) => (
  console.log("List item id:", item._id),

            <TouchableOpacity
  onPress={() => navigation.navigate("DetailsScreen", { itemId: item._id })} 
  key={item._id}
  className="w-[200px] border-[1px] border-zinc-300 rounded-lg overflow-hidden"
>

          <Image
            source={{
              uri: title === "New in"
                ? item.images?.[0]
                : item.images?.[1]
            }}
            style={{
              width: 200,
              height: 150,
              resizeMode: 'contain',
            }}
            onError={(e) => console.log('Image error:', e.nativeEvent.error)}
          />
            <View className='p-2'>
              <StyledText value={item.title} className='text-base font-semibold' />
              <Text className='mt-1 text-zinc-500 text-sm'>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default List;
