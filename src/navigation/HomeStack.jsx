import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator()

export default function HomeStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{title: "Главная"}}>
            </Stack.Screen>

            <Stack.Screen 
            name="Details" 
            component={DetailsScreen}
            options={{title: "Детали"}}>
            </Stack.Screen>
        </Stack.Navigator>
    )
}