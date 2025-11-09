import { Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useMMKVBoolean } from 'react-native-mmkv';
import { useNavigation } from '@react-navigation/native';
import api from '../utils/axios';

const Login = () => {
  const navigation = useNavigation();
  const [formdata, setFormdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useMMKVBoolean('isAuthenticated');

  const handleInput = (text, type) => {
    setFormdata(prev => ({ ...prev, [type]: text }));
  };

  const handleLogin = async () => {
    if (!formdata.email || !formdata.password) {
      return Alert.alert('Error', 'Email və Password lazımdır!');
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', formdata);
      console.log('Login success:', res.data);

      Alert.alert('Success', 'Logged in successfully!');
      setIsAuthenticated(true);
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed!';
      Alert.alert('Error', message);
      console.log('Login error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
      <Text style={{ alignSelf: 'flex-start', marginLeft: 40, fontSize: 32, fontWeight: '700' }}>Sign in</Text>

      <TextInput
        placeholder="Email Address"
        style={inputStyle}
        onChangeText={text => handleInput(text, 'email')}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={inputStyle}
        onChangeText={text => handleInput(text, 'password')}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#8E6CEF',
          paddingHorizontal: 20,
          justifyContent: 'center',
          marginTop: 20,
          width: 350,
          height: 49,
          borderRadius: 100,
          alignItems: 'center',
        }}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Continue</Text>}
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: 'black', marginLeft: 5 }}>Create One</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const inputStyle = {
  borderWidth: 1,
  borderColor: '#F4F4F4',
  backgroundColor: '#F4F4F4',
  width: 350,
  height: 56,
  paddingLeft: 24,
  marginTop: 16,
  borderRadius: 4,
};

export default Login;
