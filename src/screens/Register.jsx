import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useMMKVBoolean } from 'react-native-mmkv';

const Register = () => {

    const navigation = useNavigation();
 const [formdata, setFormdata] = useState({})
       const [isAuthenticated, setIsAuthenticated] = useMMKVBoolean('isAuthenticated');
   
    const handleInput = (text, type) => {
        setFormdata(prevState => ({
            ...prevState,
            [type]: text
        }))
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF'
        }}>
            <TouchableOpacity
                onPress={() => console.log("go back")}
                style={{width: 40, height: 40, borderRadius: 20,backgroundColor: '#F4F4F4',alignItems: 'center',justifyContent: 'center',position: 'absolute',top: 40,left: 20,}}>
                <Text style={{ fontSize: 18 }}>←</Text>
            </TouchableOpacity>


            <Text style={{ alignSelf: 'flex-start', marginLeft: 40 , fontSize: 32, fontWeight: '700'}}>Create Account</Text>

            <TextInput onChangeText={(text) => {
                handleInput(text, 'firstName')
            }} placeholder='Firstname' style={{ borderWidth: 1, borderColor: '#F4F4F4', backgroundColor: '#F4F4F4', width: 350, height:56, paddingLeft: 24, marginTop: 16,  borderRadius: 4 }} />
            
            <TextInput onChangeText={(text) => {
                handleInput(text, 'lastName')
            }} placeholder='Lastname' style={{ borderWidth: 1, borderColor: '#F4F4F4', backgroundColor: '#F4F4F4', width: 350, height:56, paddingLeft: 24, marginTop: 16,  borderRadius: 4 }} />    
            
            <TextInput onChangeText={(text) => {
                handleInput(text, 'email')
            }} placeholder='Email Adress' style={{ borderWidth: 1, borderColor: '#F4F4F4', backgroundColor: '#F4F4F4', width: 350, height:56, paddingLeft: 24, marginTop: 16,  borderRadius: 4 }} />

             <TextInput onChangeText={(text) => {
                    handleInput(text, 'password')
            }} placeholder='Password' style={{ borderWidth: 1, borderColor: '#F4F4F4', backgroundColor: '#F4F4F4', width: 350, height:56, paddingLeft: 24, marginTop: 16,  borderRadius: 4 }} />

            <TouchableOpacity  onPress={() => {
                setIsAuthenticated(true)
                // handleLogin()
            }} style={{ backgroundColor: '#8E6CEF', paddingHorizontal: 20, justifyContent: 'center', marginTop: 20, width: 350, height:49,  borderRadius: 100  }}>
                <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontWeight: '600' }}>Continue</Text>
            </TouchableOpacity>

           <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            
            <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>
                Already have an Account ?
            </Text>
  
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' )}>
                <Text style={{ fontSize: 14, fontWeight: '900', color: 'black', marginLeft: 5 }}>
                    Sign In
                </Text>
            </TouchableOpacity>

            </View>

        </View>
    )
}

export default Register

