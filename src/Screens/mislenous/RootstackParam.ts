import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define your screen names and their respective params here
type RootStackParamList = {
    Home: undefined;
    Profile: { userId: string };
    Settings: undefined;
    Login: undefined;
};

// Define the navigation props type for each screen
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;
type LogInScreenNavigationProp = StackNavigationProp<RootStackParamList, keyof RootStackParamList> & {
    navigation: any;
  };
  
// Define the route prop type for each screen
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
type SettingsScreenRouteProp = RouteProp<RootStackParamList, 'Settings'>;

export type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
};

export type ProfileScreenProps = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
};

export type SettingsScreenProps = {
    navigation: SettingsScreenNavigationProp;
    route: SettingsScreenRouteProp;
};

export type LoginscreenProps = {
    navigation: LogInScreenNavigationProp;};


export type { RootStackParamList, LogInScreenNavigationProp };