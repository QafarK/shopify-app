import { View, TextInput } from 'react-native';
import SearchIcon  from './../../assets/icons/SearchIcon.svg';

const SearchBar = () => {
  return (
    <View className='flex-row items-center bg-gray-100 rounded-xl px-3 py-2 mx-4 mt-4'>
      <SearchIcon /> 
      <TextInput
        placeholder="Search"
        placeholderTextColor="#9ca3af"
        className='flex-1 ml-2 text-base text-gray-950'
      />
    </View>
  );
};

export default SearchBar;
