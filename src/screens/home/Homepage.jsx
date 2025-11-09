import { ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import api from '../../utils/axios.js';
import List from '../../components/homepage/List';
import Categories from '../../components/homepage/Categories';
import Banner from '../../components/homepage/Banner';
import StyledView from '../../components/StyledView';
import SearchBar from '../../components/homepage/SearchBar';

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newProducts, setNewProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchProducts = async () => {
  try {
    setLoading(true);
    const newRes = await api.get('/products/new');
    const allRes = await api.get('/products');

    console.log('New:', newRes.data);
    console.log('All:', allRes.data);

    setNewProducts(Array.isArray(newRes.data) ? newRes.data : newRes.data.products);
    setAllProducts(Array.isArray(allRes.data) ? allRes.data : allRes.data.products);
    console.log('All products:', allRes.data);

  } catch (err) {
    console.error('API error:', err.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredNew = newProducts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAll = allProducts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </StyledView>
    );
  }

  return (
    <ScrollView className="flex-1">
      <StyledView>
        <Banner />
        <SearchBar onSearch={setSearchTerm} />
        <Categories />
        <List data={filteredNew} title="New in" />
        <List data={filteredAll} title="All products" />
      </StyledView>
    </ScrollView>
  );
};

export default Homepage;
