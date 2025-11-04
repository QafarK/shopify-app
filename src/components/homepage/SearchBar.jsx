// import { View, TextInput } from 'react-native';
// import SearchIcon  from './../../assets/icons/SearchIcon.svg';

// const SearchBar = () => {
//   return (
//     <View className='flex-row items-center bg-gray-100 rounded-xl px-3 py-2 mx-4 mt-4'>
//       <SearchIcon /> 
//       <TextInput
//         placeholder="Search"
//         placeholderTextColor="#9ca3af"
//         className='flex-1 ml-2 text-base text-gray-950'
//       />
//     </View>
//   );
// };

// export default SearchBar;

// components/homepage/SearchBar.jsx
import { View, TextInput } from "react-native";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (text) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <View className="bg-gray-100 rounded-xl mx-4 mt-4 mb-2 p-2">
      <TextInput
        className="text-base px-2"
        placeholder="Search products..."
        value={query}
        onChangeText={handleChange}
      />
    </View>
  );
};

export default SearchBar;
