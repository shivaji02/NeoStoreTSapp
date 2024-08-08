import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './src/Screens/MainNavigation';

const App: React.FC = () => {
  console.log('Rendering App with Provider');


  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
