import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export const getToken = () => storage.getString('authToken')
export const getRefreshToken = () => storage.getString('refreshToken')

export const setToken = (token) => storage.set('authToken', token)
export const setRefreshToken = (token) => storage.set('refreshToken', token)

export const clearToken = () => {
    storage.delete('authToken')
    storage.delete('refreshToken')
}