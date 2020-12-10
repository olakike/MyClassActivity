import { } from 'react-native-gesture-handler';
import React from 'react';
import { View, Text,StyleSheet, TextInput} from "react-native"

function Forgotpassword({navigation}) {
    return (
        <View> 
            <TextInput> Recovery Email</TextInput>
    <Text> Welcome</Text>
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

export default Forgotpassword;