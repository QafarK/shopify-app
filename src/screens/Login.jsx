import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { useMMKVBoolean } from 'react-native-mmkv';

const Login = () => {
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
            <Text style={{ alignSelf: 'flex-start', marginLeft: 40 , fontSize: 32, fontWeight: '700'}}>Sign in</Text>
            <TextInput onChangeText={(text) => {
                handleInput(text, 'email')
            }} placeholder='Email Adress' style={{ borderWidth: 1, borderColor: '#F4F4F4', backgroundColor: '#F4F4F4', width: 350, height:56, paddingLeft: 24, marginTop: 16,  borderRadius: 4 }} />

             <TextInput onChangeText={(text) => {
                    handleInput(text, 'password')
            }} placeholder='Password' style={{ borderWidth: 1, borderColor: '#F4F4F4', backgroundColor: '#F4F4F4', width: 350, height:56, paddingLeft: 24, marginTop: 16,  borderRadius: 4 }} />

            {/* sign in button */}
            <TouchableOpacity  onPress={() => {
                setIsAuthenticated(true)
            }} style={{ backgroundColor: '#8E6CEF', paddingHorizontal: 20, justifyContent: 'center', marginTop: 20, width: 350, height:49,  borderRadius: 100  }}>
                <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 16, fontWeight: '600' }}>Sign in</Text>
            </TouchableOpacity>

           <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            
            <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>
                Don't have an account ?
            </Text>
  
            <TouchableOpacity onPress={() => {console.log('create one')}}>
                <Text style={{ fontSize: 14, fontWeight: '900', color: 'black', marginLeft: 5 }}>
                    Create One
                </Text>
            </TouchableOpacity>

            </View>

        </View>
    )
    // show password duzeld!!!!
// {/* <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//   <Text style={{ color: '#8E6CEF', fontWeight: '600' }}>Create One</Text>
// </TouchableOpacity> */}

 
    
}

export default Login