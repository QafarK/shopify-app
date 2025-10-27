import { Text, FlatList, TouchableOpacity } from 'react-native'

const Categories = () => {
    const categories = [
        {
            id: 1,
            title: 'All',
        },
        {
            id: 2,
            title: 'Tech',
        },
        {
            id: 3,
            title: 'Sports',
        },
        {
            id: 4,
            title: 'Food',
        },
        {
            id: 5,
            title: 'Movies',
        },
        {
            id: 6,
            title: 'Fashion',
        },
        {
            id: 7,
            title: 'Books',
        },
    ]

    return (
        <FlatList showsHorizontalScrollIndicator={false} contentContainerClassName='gap-2 px-4' horizontal data={categories} renderItem={({ item }) =>
            <TouchableOpacity key={item.id} className='p-4 bg-gray-300 rounded-lg'>
                <Text>{item.title}</Text>
            </TouchableOpacity>} />
    )
}

export default Categories