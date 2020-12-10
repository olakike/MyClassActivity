import React from"react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Entypo} from "@expo/vector-icons"

import Home from "./Home";
import Search from "./Search";
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const Dashboard = ({fullname, Navigation}) => {
    return (
      <Tab.Navigator 
      screenOptions={({route})=>({
        tabBarIcon:({ focused,color,size})=>{
          let iconName;
          if (route.name ==="Home"){
            iconName="home"
          } else if (route.name === 'Search') {
            iconName = "md.search"
          } else if (route.name === 'Profile') {
            iconName = 'users'
          }
          return <Entypo name={iconName} size={45} color={color}/>
        }
      })}
      tabBarOptions={{
        activeTintColor:"green",
        inactiveTintColor: "gray",
        labelStyle:{
          fontSize:30
        },
        iconStyle:{
          size:50
        },
        showLabel:false
      }}
      >
         <Tab.Screen name="Home" component={Home}/>
         <Tab.Screen name="Search" component ={Search}/>
         <Tab.Screen name="Profile" >
           {()=> <Profile fullname={fullname}/>}
         </Tab.Screen>
      </Tab.Navigator>  
    )
};

export default Dashboard;