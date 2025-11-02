import {TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import HomeImage from '../../assets/icons/Shop.svg'
import BasketIcon from '../../assets/icons/Basket.svg'
import { useNavigation } from '@react-navigation/native'
const Banner = () => {
    const navigation = useNavigation();  
    return (

            <View className='h-24 flex-row items-center justify-between px-4'>
                
                <HomeImage />

                <TouchableOpacity onPress={() =>  navigation.navigate('BasketScreen')}>
                    <BasketIcon />
                </TouchableOpacity>

            </View>
    )
}

export default Banner