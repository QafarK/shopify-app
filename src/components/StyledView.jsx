import { View } from 'react-native'
import { useMMKVBoolean } from 'react-native-mmkv';

const StyledView = ({ children }) => {
    const [darkmode, setDarkmode] = useMMKVBoolean('darkmode');

    return (
        <View className={`${darkmode ? 'bg-slate-800' : 'bg-white'} flex-1`}>
            {children}
        </View>
    )
}

export default StyledView