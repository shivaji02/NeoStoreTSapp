import React from 'react';
import { View, TouchableOpacity, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface TabBarProps {
    navigateTo: string;
    title: string;
    nextNavigateTo?: string; // Optional prop for next navigation
}

const TabBar: React.FC<TabBarProps> = ({ navigateTo, title, nextNavigateTo }) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate(navigateTo);
    };

    const handleNextPress = () => {
        if (nextNavigateTo) {
            navigation.navigate(nextNavigateTo);
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
            <TouchableOpacity onPress={handleBackPress}>
            <Button icon={{ uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400' }}>Press me</Button> 
                       </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
            {nextNavigateTo && (
                <TouchableOpacity onPress={handleNextPress}>
                    <Icon name="arrow-forward" size={24} color="black" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default TabBar;




// import React from 'react';
// import { View } from 'react-native';
// import TabBar from './TabBar'; // Adjust the import path as necessary

// const SomeScreen = () => {
//     return (
//         <View>
//             <TabBar navigateTo="Login" title="HomeScreen" nextNavigateTo="NextScreen" />
//             {/* Your other screen content goes here */}
//         </View>
//     );
// };

// export default SomeScreen;
// demonstation of use