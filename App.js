import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import {HStack} from 'native-base';
import {DarkTheme, DefaultTheme, NavigationContainer, useTheme} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./components/HomeScreen";
import ToDoApp from "./components/ToDoApp";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createDrawerNavigator} from "@react-navigation/drawer";
import UserStores from "./Stores/UserStores";
import NewsPage from "./components/NewsPage";
import { themes } from './utils/Theme';
import WeatherApp from "./components/WeatherApp";
import CoinFlip from "./components/CoinFlip";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


export default function App() {

    const [isOpen, setOpen] = React.useState(false);
    const [darkmode, setDarkmode] = useState(false);
    const [tasks, setTasks] = useState(0);

    const { colors } = useTheme();

    const Home = (props) => (
        <HomeScreen darkmode={darkmode} setDarkmode={setDarkmode} />
    );


    return (
    <NavigationContainer theme={darkmode ? themes.dark : themes.light}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused ,color, size }) => {
              let iconName;
              if(route.name === 'Home'){
                  iconName = focused
                      ? 'folder-home'
                      : 'folder-home-outline';
              } else if (route.name  === 'To-Do'){
                  iconName= focused ? 'alarm' : 'alarm';
              }
                else if (route.name === 'News'){
                    iconName = focused ? 'newspaper-variant-multiple' : 'newspaper-variant-multiple-outline'
              }
                else if(route.name === 'Weather'){
                    iconName = focused ? 'weather-cloudy' : 'weather-cloudy'
              }

              return <MaterialCommunityIcons name={iconName} color={color} size={size} />
          },
        })}
        tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'grey'
        }}
      >
        <Tab.Screen initialParams={{ setDark : setDarkmode, darkmode: darkmode }} name={"Home"} component={Home} />
        <Tab.Screen initialParams={{ setTask: setTasks, tasks: tasks }} name={"To-Do"} component={ToDoApp} options={{ tabBarBadge: tasks === 0 ? null : tasks }} />
        <Tab.Screen name={"News"} component={NewsPage}/>
        <Tab.Screen name={"Weather"} component={WeatherApp}/>
        <Tab.Screen name={"Coin Flip"} component={CoinFlip}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  }
});
