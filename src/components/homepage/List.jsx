import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const List = ({ data, title }) => {
    const navigation = useNavigation();


    return (
        <>
            <Text className='text-2xl font-semibold ml-4 mb-2 mt-5'>{title}</Text>
            <FlatList
                ListEmptyComponent={() => <View>
                    <Text className='text-center mt-5'>No products found</Text>
                </View>}
                
                showsHorizontalScrollIndicator={false} contentContainerClassName="gap-4 px-4" horizontal data={data} renderItem={({ item }) => 
                <TouchableOpacity onPress={() => {navigation.navigate("DetailsScreen", {itemId: item.id}) }} key={item.id} className='w-[200px] border-[1px] border-zinc-300 rounded-lg overflow-hidden'>

                    <Image source={{ uri: item.image }} className='h-[150px] w-full object-scale-down' />
                    <View className='p-2'>
                        <Text className='text-base font-semibold'>{item.title}</Text>
                        <Text className='mt-1 text-zinc-500 text-sm'>${item.price}</Text>
                    </View>
                </TouchableOpacity>} />
        </>
    )
}

export default List