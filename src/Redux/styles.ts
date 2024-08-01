import { StyleSheet } from 'react-native'

const styles =   StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:20
    },
    product:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    image:{
        width:100,
        height:100
    },


})

export default styles;