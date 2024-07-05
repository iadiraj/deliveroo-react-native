import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Platform, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { Provider } from "react-redux";
import store from "./store";
import BasketScreen from "./screens/BasketScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const isIOS = Platform.OS === "ios";
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{
              presentation: "modal",
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="PreparingOrderScreen"
            component={PreparingOrderScreen}
            options={{
              headerShown: false,
              presentation: "fullScreenModal",
            }}
          />
          <Stack.Screen
            name="Delivery"
            component={DeliveryScreen}
            options={{
              headerShown: false,
              presentation: "fullScreenModal",
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
