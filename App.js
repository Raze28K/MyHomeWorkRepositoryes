import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootTabs from "./src/navigation/RootTabs";
import { FavouritesProvider } from "./src/context/FavouritesContext";

export default function App(){
  return(
    <FavouritesProvider>
      <NavigationContainer>
        <RootTabs/>
      </NavigationContainer>
    </FavouritesProvider>

  )
}