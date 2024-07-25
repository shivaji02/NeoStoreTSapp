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
        margin:8,
        borderRadius:10,
        width:200
    },
    link:{
        margin:20,
        color:'blue',
        
    },
    checkboxView: {
        marginTop: 10,
    
        flexDirection: 'row',
    
        alignItems: 'center',
    
    },
    checkbox: {
        alignSelf: 'flex-start',
    },
    error:{
        color:'red',
        fontSize:20
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
    
});


export default styles;