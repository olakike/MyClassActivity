import { } from 'react-native-gesture-handler';
import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert, ActivityIndicator} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as yup from 'yup';
import {Formik} from 'formik';
import{auth, firestore} from '../config/firebase';


const signupValidationSchema = yup.object().shape({
  fullname:yup.string()
  .required('*Required'),
  email: yup.string()
  .required("*Required")
  .email('Invalid Email'),
  password: yup.string()
  .required('*Required')
 .min(8),
 });


export default function Signup({navigation}) {
  const[errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (values) => {
    setIsLoading(true)
    try {
      const {fullname,email,password}=values;
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      if(user){
        await user.updateProfile({
          displayName: fullname
        })
        const profile = firestore.collection('user').doc(user.uid);
        profile.set({
          fullname,
          email
        })
        setIsLoading(false);
        Alert.alert('Account created successfully');
      }
      navigation.navigate('Signin');
  } catch (error) {
    if (error.code === 'auth/email-already-in-use'){
      setErrorMsg('Email address in use by another user');
      setIsLoading(false);
      
    }
  }
    }
    
   
  return (
      <View style={styles.container}>
          <Image style={styles.logocontainer} source={require('../assets/images/NA-GLOW-LOGO-WITH-DETAILS-s.png') } />
        <Formik
            initialValues={{fullname: '',email:'',password:''}}
            onSubmit={values => handleSignup(values)}
            validationSchema={signupValidationSchema}
          >
            {({ handleChange,handleBlur,handleSubmit,values,errors})=> (
            <View style={{width:'100%', justifyContent:'center'}}>
              <Text style={{ textAlign:"center"}}>{errorMsg && <Text style={{color: 'red', fontStyle:"italic",}}> {errorMsg}</Text>}</Text>
              <View style={styles.textview}>
              <Entypo name="user" size={30} style={{padding:10, marginTop:20}} />
                <TextInput
                  placeholder="Enter Fullname"
                  autoCapitalize="none"
                  style={styles.input}
                  onChangeText={handleChange('fullname')}
                  onBlur={handleBlur('fullname')}
                  onKeyPress={() =>setErrorMsg('') }
                />
              </View>
            {errors.fullname && <Text style={styles.errorText}>{errors.fullname}</Text>}
              <View style={styles.textview}>
              <Entypo name="email" size={30} style={{padding:10, marginTop:20}} />
              <TextInput
                placeholder="Enter Email Address"
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                onKeyPress={() =>setErrorMsg('') }
              />
              </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              <View style={styles.textview}>
              <Entypo name="lock" size={30} style={{padding:10, marginTop:20}} />
              <TextInput
                placeholder="Enter Password"
                secureTextEntry
                autoCapitalize="none"
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                onKeyPress={() =>setErrorMsg('') }
              />
              </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
             {isLoading ?(
                <TouchableOpacity onPress={handleSubmit} disabled={!values.fullname||!values.email || !values.password}  style={!values.fullname||!values.email||!values.password ? styles.DisabledButton:styles.button}>
                  <ActivityIndicator size="small" color="white"></ActivityIndicator>
              </TouchableOpacity>
             ) :(
              <View style={styles.buttonwidth} >
                <TouchableOpacity onPress={handleSubmit} disabled={!values.fullname||!values.email || !values.password}  style={!values.fullname||!values.email||!values.password ? styles.DisabledButton:styles.button}>
                  <Text style={styles.buttonText} > SIGNUP </Text>
                </TouchableOpacity>
              </View>
             )} 
              <View style={styles.textview2}>
                <Text> Have Account? </Text>
                <Text style={styles.signin} onPress={()=> navigation.navigate("Signin")}> LOGIN </Text>
              </View>
        </View>
        )}
        </Formik>
      </View>
    )
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:"100%", 
      alignItems: "center",
      justifyContent:"center",
      alignSelf:"center",
      backgroundColor: "#fff",
    },
    logocontainer: {
      width:150,
      height:150,
      alignSelf:"center",
      borderRadius:"50%"
    },
    textview:{
      flexDirection:"row"
    },
    textview2:{
      flexDirection:"row",
      textAlign:'center' 
    },
    buttonwidth:{
      width:"80%",
      alignContent:"center",
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center'
    },  
    input: {
      width: 300,
      height: 40,
      padding: 10,
      marginTop: 20,
      marginBottom: 10,
      backgroundColor: "#e8e8e8",
      borderWidth: 2
    },
    fullNameinput: {
      width: 250,
      height: 44,
      padding: 10,
      marginTop: 20,
      marginBottom: 10,
      backgroundColor: "#FDD7E4",
    },
    button:{
      backgroundColor:"green",
      paddingHorizontal:10,
      paddingVertical:10,
      marginVertical:10,
      borderRadius:"8%",
      justifyContent:'center',
      alignItems: "center",
      marginTop:10,
      width: 300,
      height: 40,
    },
    buttonText:{
      color:"white",
      textAlign:"center"
    },
    signin:{
      color: 'blue'
    },
    DisabledButton:{
      backgroundColor:'gray',
      alignItems: "center",
      padding: 10,
      marginTop:10,
      width:350,
      height: 40,
    },
    errorText:{
      color:'red',
      width:'100%',
      textAlign: "left",
      paddingLeft: 40
    },
  });
  