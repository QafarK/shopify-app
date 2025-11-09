import { Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMMKVBoolean } from 'react-native-mmkv';
import api from '../utils/axios'; 

const Register = () => {
  const navigation = useNavigation();
  const [formdata, setFormdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useMMKVBoolean('isAuthenticated');

  const handleInput = (text, type) => {
    setFormdata(prev => ({ ...prev, [type]: text }));
  };

const handleRegister = async () => {
  setLoading(true);
  try {
    const res = await api.post('/auth/signup', formdata);
    console.log('Register success:', res.data);

    Alert.alert('Success', 'Account created successfully!');
    setIsAuthenticated(true);
  } catch (error) {
    console.log('Register error:', error.response?.data || error.message);


    if (error.response?.data?.error) {
  const errors = error.response.data.error;


  const messages = Object.values(errors)
    .map(errObj => errObj?.message || JSON.stringify(errObj))
    .join('\n');

  Alert.alert('Error', messages);
}
 else {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong!');
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
      
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#F4F4F4',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 40,
          left: 20,
        }}
      >
        <Text style={{ fontSize: 18 }}>←</Text>
      </TouchableOpacity>

      <Text style={{ alignSelf: 'flex-start', marginLeft: 40, fontSize: 32, fontWeight: '700' }}>
        Create Account
      </Text>

      <TextInput
        placeholder="Firstname"
        style={inputStyle}
        onChangeText={text => handleInput(text, 'firstname')}
      />
      <TextInput
        placeholder="Lastname"
        style={inputStyle}
        onChangeText={text => handleInput(text, 'lastname')}
      />
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
        onPress={handleRegister}
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
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Continue</Text>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>Already have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{ fontSize: 14, fontWeight: '900', color: 'black', marginLeft: 5 }}>Sign In</Text>
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

export default Register;
