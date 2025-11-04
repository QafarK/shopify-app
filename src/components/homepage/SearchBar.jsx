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
