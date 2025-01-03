import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import Legal from './src/components/Legal';
import { Provider } from 'react-redux';
import store from './src/classes/store/store'
import LocationProvider from './src/components/LocationProvider';
import Overpass from './src/classes/Overpass';


export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {
          Platform.OS != "web" ? (
            <LocationProvider />
          ) : null
        }
        {
          Platform.OS != "web" ? (
            <Overpass />
          ) : null
        }
        <Legal />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
