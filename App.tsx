import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import DashboardScreen from "./src/screens/DashboardScreen";
import NovaDespesaScreen from "./src/screens/NovaDespesaScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#2e7d32" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: "Minhas Despesas" }}
        />
        <Stack.Screen
          name="NovaDespesa"
          component={NovaDespesaScreen}
          options={{ title: "Nova Despesa" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
