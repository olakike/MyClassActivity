import "react-native-gesture-handler"
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"

import Landing from "./screens/Landing";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import Forgotpassword from './screens/Forgotpassword'


import{auth} from './config/firebase';

const Stack = createStackNavigator();

export default function App() {
  const [ fullname, setFullname]=useState('');
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
    if(user) {
     setFullname(user.displayName);
    } else {
        console.log('not logged in');
    }
    })
  },[]);

  return (
    <>
      <StatusBar backgroundColor="green" barStyle="light-content"/>
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
         headerTitleAlign: "center",
         headerStyle:{
           backgroundColor: "#728C00"
         },
         headerTintColor: "#fff",
         headerTitleStyle:{
           fontWeight: "bold"
         }
       }}
       >
        <Stack.Screen  options={{headerShown:false}} name='Welcome' component={Landing} />
        <Stack.Screen  
        options={{
          headerTitleAlign:"center",
          headerStyle:{ 
            backgroundColor:"#54C571"
          },
          headerTitleStyle:{
            color:"white"
          },
          headerTintColor:{
            color:"white"
          }
          }}name='Signin' component={Signin}/>
          <Stack.Screen  
        options={{
          headerTitleAlign:"center",
          headerStyle:{ 
            backgroundColor:"#54C571"
          },
          headerTitleStyle:{
            color:"white"
          },
          headerTintColor:{
            color:"white"
          }
          }}name='Signup' component={Signup}/>
        <Stack.Screen         options={{
          headerTitleAlign:"center",
          headerStyle:{ 
            backgroundColor:"#54C571"
          },
          headerTitleStyle:{
            color:"white"
          },
          headerTintColor:{
            color:"white"
          }
          }} options={{headerShown:false}} name='Dashboard'>
            {() =><Dashboard fullname={fullname}/> }
          </Stack.Screen>
          <Stack.Screen options={{headerShown:false}} name='Forgotpassword' component={Forgotpassword} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
