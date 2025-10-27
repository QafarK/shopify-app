import { Text, TouchableOpacity } from 'react-native'
import { useMMKVBoolean } from 'react-native-mmkv';

const DarkModeToggle = () => {
    const [darkmode, setDarkmode] = useMMKVBoolean('darkmode');

    return (
        <TouchableOpacity onPress={() => {
            setDarkmode(prevState => !prevState)
        }} className='bg-orange-500 w-[50px] rounded-full'><Text className='font-bold text-center'>{darkmode ? "light" : "dark"}</Text></TouchableOpacity>
    )
}

export default DarkModeToggle