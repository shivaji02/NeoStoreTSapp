import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'tomato',
        alignItems: 'center',
        justifyContent: 'center'

    },
    scrlv: {
        flex: 1,
        backgroundColor: 'tomato',
     },
    title:{
        fontSize:30,
        fontWeight:'bold',
        color:'white'
    },
    buttonText:{
        fontSize:20,
        color:'white'
    },
    button:{
        backgroundColor:'#04393c',
        padding:10,
        margin:10,
        borderRadius:10
    },
    buttontext:{   
        fontSize:20,
        color:'white'
     },
    input:{
        backgroundColor:'gray',
        padding:10,
        margin:10,
        borderRadius:10,
        width:200
    },
    link:{
        margin:20,
        color:'blue',
        
    }
});


export default styles;