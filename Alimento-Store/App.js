import { createContext, useState } from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator ()

//telas do app
import Home from "./src/telas/home"
import Detalhesdoproduto from "./src/telas/detalhesProduto"
import Carrinho from "./src/telas/carrinho"
export const Context = createContext ()

export default function () {

  const [ nomeProduto, setNomeProduto ] = useState ([])

  return (
  <NavigationContainer>
    <Context.Provider value={{
      nomeProduto,
      setNomeProduto
    }}>
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="detalhes" component={Detalhesdoproduto} />
      <Stack.Screen name="carrinho" component={Carrinho} />
    </Stack.Navigator>
    </Context.Provider>
  </NavigationContainer>
  )
}