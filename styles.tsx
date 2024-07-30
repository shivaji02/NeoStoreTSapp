import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-paper';
import CheckboxItem from 'react-native-paper/lib/typescript/components/Checkbox/CheckboxItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'tomato',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',

    },

    scrlv: {
        flex: 1,
        backgroundColor: 'tomato',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center', // Add this line to center the text horizontally
        width: 60,

    },
    corosel: {
        width: 350,
        height: 200,
        borderRadius: 10,
        margin: 10
    },
    carouselItem: {
        width: 300, // Adjust the width as needed
        height: 200, // Adjust the height as needed
        justifyContent: 'center',
        alignItems: 'center',
    },

    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 30

    },
    button: {
        backgroundColor: '#04393c',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    buttontext: {
        fontSize: 20,
        color: 'white'
    },
    input: {
        backgroundColor: 'gray',
        padding: 10,
        margin: 8,
        borderRadius: 10,
        width: 270
    },
    inputContainer: {
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    inputText: {
        fontSize: 20,
        color: 'black'
    },
    icon: {
        color: 'black',
        fontSize: 5
    },
    link: {
        margin: 2,
        color: 'orange',
    },
    checkboxView: {
        marginTop: 10,

        flexDirection: 'row',

        alignItems: 'center',

    },

    checkbox: {
        alignSelf: 'flex-start',
    },
    error: {
        color: 'teal',
        fontSize: 10,
        marginLeft: 10

    },
    listContainer: {
        padding: 20,
    },
    itemContainer: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        marginVertical: 8,
        borderRadius: 5,

    },
    image: {
        width: 350,
        height: 200,
        borderRadius: 10,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: '#555',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    forgotPassword: {
        color: 'blue',
        fontSize: 20
    },
    register: {
        color: 'blue',
        fontSize: 20
    },
    otp: {
        color: 'blue',
        fontSize: 20
    },
    otpContainer: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    otpInput: {
        backgroundColor: 'gray',
        padding: 10,
        margin: 8,
        borderRadius: 10,
        width: 200
    },
    otpButton: {
        backgroundColor: '#04393c',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    otpButtonText: {
        fontSize: 20,
        color: 'white'
    },
    otpText: {
        fontSize: 20,
        color: 'black'
    },
    CheckboxItem: {
        backgroundColor: 'gray',
        padding: 10,
        margin: 8,
        borderRadius: 10,
        width: 200
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

});


export default styles;