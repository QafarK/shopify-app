import { ScrollView } from 'react-native'
import List from '../../components/homepage/List'
import Categories from '../../components/homepage/Categories'
import Banner from '../../components/homepage/Banner'
import StyledView from '../../components/StyledView'
import { useEffect } from 'react'
import api from '../../utils/axios.js'
import  SearchBar  from '../../components/homepage/SearchBar'
import Rectangle1 from '../../assets/icons/Rectangle1.svg'
import Rectangle2 from '../../assets/icons/Rectangle2.svg'
import Rectangle3 from '../../assets/icons/Rectangle3.svg'
import Rectangle4 from '../../assets/icons/Rectangle4.svg'
const Homepage = () => {
  const getUserData = async () => {
    try {
      const { data } = await api.get('/user/user-data');
      console.log(data)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    getUserData()
  }, [])


const firstProducts = [
  {
    id: 1,
    title: "Men's Harrington Jacket",
    category: 'Hoodies',
    image: 'https://m.media-amazon.com/images/I/512zSxD04SL._AC_UY1000_.jpg',
    price: 120
  },
  {
    id: 2,
    title: "Max Cirro Men's Slides",
    category: 'Shoes',
    image: 'https://www.permanentstyle.com/wp-content/uploads/2023/08/rondini-sandals-style.jpg', 
    price: 65
  },
]

const otherProducts = [
  {
    id: 3,
    title: "Men's Harrington Jacket",
    category: 'Hoodies',
    image: 'https://www.johnpartridge.com/cdn/shop/files/mens-harrington-jacket-navy.png?v=1747647869', 
    price: 75
  },
  {
    id: 4,
    title: "Men's Casual T-Shirt",
    category: 'T-Shirts',
    image: 'https://m.media-amazon.com/images/I/512zSxD04SL._AC_UY1000_.jpg',

    price: 35
  },
]



    return (
        <ScrollView className='flex-1'>

<StyledView>

            <Banner/>

            <SearchBar />

            <Categories /> 
           
            <List data={firstProducts} title="New in" />

            <List data={otherProducts} title="All products" />
</StyledView>

        </ScrollView>
    )
}

export default Homepage