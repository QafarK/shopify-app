import { ScrollView } from 'react-native'
import List from '../../components/homepage/List'
import Categories from '../../components/homepage/Categories'
import Banner from '../../components/homepage/Banner'
import { Link } from '@react-navigation/native'

const Homepage = () => {
    const techProducts = [
        {
            id: 1,
            title: 'Macbook Pro',
            category: 'Tech',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            price: 1999
        },
        {
            id: 2,
            title: 'Iphone 14 Pro',
            category: 'Tech',
            image: 'https://m.media-amazon.com/images/I/61HHS0HrjpL._UF1000,1000_QL80_.jpg',
            price: 999
        },
    ]

    const otherProducts = [
        {
            id: 3,
            title: 'Football',
            category: 'Sports',
            image: 'https://contents.mediadecathlon.com/p2154018/k$62eddd5da1ca0c3add68b47c60eee952/football-size-5-first-kick-for-kids-ages-to-12-years-yellow.jpg',
            price: 49
        },
        {
            id: 4,
            title: 'Pizza',
            category: 'Food',
            image: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Homemade-Pizza_EXPS_FT23_376_EC_120123_3.jpg',
            price: 19
        },
    ]

    return (
        <ScrollView className='flex-1'>
            <Banner/>

            <Link screen="DiscountedItemsScreen" className='underline ml-4 mb-4'>See discounted products</Link>

            <Categories />

            <List data={techProducts} title="Tech products" />

            <List data={otherProducts} title="Other products" />

        </ScrollView>
    )
}

export default Homepage