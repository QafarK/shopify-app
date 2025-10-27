/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "./global.css"
import { StatusBar, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Navigator from './src/stacks/Navigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

const AppContent = () => {
  const insets = useSafeAreaInsets()

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom
    }}>
    <Navigator/>
    </View>
  )
}

export default App;