import { } from 'react-native-gesture-handler';
import React, {useState} from 'react';
import { View, Text, StyleSheet,Button,TextInput,Image,ActivityIndicator,TouchableOpacity} from 'react-native';
import {Entypo} from "@expo/vector-icons";
import * as yup from 'yup';
import {Formik} from 'formik';
import { auth,firestore } from 'firebase';


const SigninValidationSchema = yup.object().shape({
  email: yup.string()
  .required("*Required")
  .email('Invalid Email'),
  passowrd: yup.string()
  .required('*Required')
});

export default function Signin({navigation}) {
  const[errorMsg, setErrorMsg] = useState('');
  const[isLoading, setIsLoading] = useState(false);

    
    const handleSignin = async (values) => {
      try{
        const {email, password} = values;
        const{user} = await auth.signInWithEmailAndPassword(email,password);
        navigation.navigate('Dashboard');
        console.log(user)
      }catch(error) {
        if (error.code === 'auth/user-not-found'){
          setErrorMsg('Email incorrect');
          setIsLoading(false);
        }
       if (error.code === 'auth/wrong-password'){
          setErrorMsg('Password Incorrect');
          setIsLoading(false);
        }
    }
    }
  
    return (
      <View style={styles.container}>
         <View style={styles.container1}>
          <Image style={styles.imagedp} source={require('../assets/images/alt background.jpg')} />
          <Text style={styles.ftext} > WELCOME BACK  </Text>
          <Text style={styles.ftext} > TO </Text>
          <Text style={styles.ftext} > NA-GLOW ORGANICS </Text>
          </View>
        <Formik
            initialValues={{email:'',password:''}}
            onSubmit={values => handleSignin(values)}
            validationSchema={SigninValidationSchema}
          >
            {({ handleChange,handleBlur,handleSubmit,values,errors}) => (

      <View style={styles.container}>
         <Text style={{ textAlign:"center"}}>{errorMsg && <Text style={{color: 'red', fontStyle:"italic",}}> {errorMsg}</Text>}</Text>
        <View style={styles.textview}>
          <Entypo name="email" size={30} style={{padding:10, marginTop:20}} />
          <TextInput
           placeholder="Enter Email Address"
           autoCapitalize="none"
           keyboardType="email-address"
           style={styles.input}
           onChangeText={handleChange('email')}
           onBlur={handleBlur('email')}
           onKeyPress={()=> setErrorMsg('')}
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
           onKeyPress={()=> setErrorMsg('')}
          />
        </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          {<Text style={styles.forgetpassword} onPress={()=> navigation.navigate('Forgotpassword')}> Forgot password? </Text>}
          {isLoading ?(
                <View style={styles.buttonwidth} >
                <TouchableOpacity onPress={handleSubmit} disabled={!values.email || !values.password}  style={!values.email||!values.password ? styles.DisabledButton:styles.button}>
                  <ActivityIndicator size="small" color="white"></ActivityIndicator>
              </TouchableOpacity>
              </View>
             ) :(
              <View style={styles.buttonwidth} >
                <TouchableOpacity onPress={handleSubmit} disabled={!values.email || !values.password}  style={!values.email||!values.password ? styles.DisabledButton:styles.button}>
                  <Text style={styles.buttonText} > LOGIN </Text>
                </TouchableOpacity>
              </View>
             )} 
             <Text style={styles.ftext} > OR </Text>
          <View style={styles.textview}>
             <Entypo name="facebook-with-circle" size={54} color="white" style={{padding:10, marginTop:20}}/>
             <Entypo name="instagram-with-circle" size={54} color="white" style={{padding:10, marginTop:20}}/>
             <Entypo name="twitter-with-circle" size={54} color="white" style={{padding:10, marginTop:20}}/>
          </View>
          <Text style={styles.forgetpassword}> Don't Have Account?
          <Text style={styles.signup} onPress={()=> navigation.navigate("Signup")}> SignUp </Text>  
          </Text>
      </View>
            )}
        </Formik>
      </View>
    )
  };  

  const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:"#52D017",
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent:"center",
        marginTop: 10,
        paddingStart:10
      },
    image:{
        width:400,
        height:'65%',
        justifyContent:'center'
    },
    ftext:{
        fontSize: 25,
        justifyContent:"center",
        fontWeight:"bold",      
        marginTop:10
    },
    imagebd:{
        width:"100%",
        height:"100%",
    },
      imagedp:{
      width:200,
      height:200,
      justifyContent:"center",
      alignSelf:"center",
      padding:5,
      borderRadius: '50%'
    },
    textview:{
      flexDirection:"row",
    },
     logo:{
        width:100,
        height:100,
        alignSelf:"flex-start",
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
      forgetpassword: {
        color: "orangered",
        fontSize: 20,
        textAlign: "center",
      },
      button: {
        alignItems: "center",
        backgroundColor: "green",
        padding: 10,
        marginTop:10,
        width:350,
        height: 40,
      },
      buttonText:{
        color:"white",
        textAlign:"center"
      },
      signup:{
        color:"#000080"
      },
      errorMsg:{
        fontSize:20,
        color:"red"
      },
      errorText:{
        color:'red',
        width:'100%'
      },
      DisabledButton:{
        backgroundColor:'gray',
        alignItems: "center",
        padding: 10,
        marginTop:10,
        width:350,
        height: 40,
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
        alignSelf:"center"
      },
})


