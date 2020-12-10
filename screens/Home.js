import React from "react";
import { View, Text,StyleSheet} from "react-native"

const Home =() =>{
    return (
        <View> 
            <Text> This is HomeScreen</Text>
        </View>
        

    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Home;