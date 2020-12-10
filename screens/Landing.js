import React from 'react';
import { View, Image, StyleSheet, Text, Button,SafeAreaView} from 'react-native';


export default function Landing({navigation}) {
    return (
    <SafeAreaView style={styles.container}>
    <View >
        <View style={styles.logocontainer}>
        <Image style={ styles.image} source={require("../assets/images/aloe honey.jpg") } />
        <Text style={ styles.ftext}> NA-GLOW ORGANICS </Text>
        </View>
        <Button style={styles.button} onPress={() => navigation.navigate('Signup')} 
        title='GET STARTED'
        color="green"
        />
    </View>
    </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        padding:10,
        backgroundColor: "#EAC117",
        justifyContent:"center",
        width:"100%"
    },
    image:{
        width:300,
        height:300,
        justifyContent:'center',
        paddingTop: 2,
        alignSelf:"center",
        borderRadius:"50%"
    },
    ftext:{
        fontSize: 30,
        alignContent:"center",
        justifyContent:"space-evenly",
        fontWeight:"bold"      
    },
    logocontainer:{
        marginBottom:200,
        marginTop:200,
        justifyContent:"center"
    },
    button: {
        alignItems: "center",
        backgroundColor: "green",
        padding: 10,
        marginTop:10,
        width: 300,
        height: 70,
        borderRadius:"5%"
      },
})

