import { FlatList, Text, TouchableOpacity } from 'react-native'

const Banner = () => {
    const items = [
        {
            id: 1,
            message: '50% off on all products',
            bgColor: "bg-blue-500"
        },
        {
            id: 2,
            message: 'Free shipping on orders over $50',
            bgColor: "bg-red-500"
        }
    ]
    return (
        <FlatList showsHorizontalScrollIndicator={false} horizontal contentContainerClassName='px-4 my-5 gap-4' data={items} renderItem={({ item }) => <TouchableOpacity className={`${item.bgColor} rounded-lg w-[84%] h-[200px] justify-center items-center`}>
            <Text className="text-center text-white text-2xl font-medium">{item.message}</Text>
        </TouchableOpacity>} />
    )
}

export default Banner