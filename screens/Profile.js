import React from "react";
import { View, Text,StyleSheet} from "react-native"

const Profile =({fullname}) =>{
    return (
        <View> 
            <Text> This is Profile</Text>
    <Text> Welcome {fullname}</Text>
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

export default Profile;