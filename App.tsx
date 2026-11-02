import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./src/screens/DashboardScreen";
import NovaDespesaScreen from "./src/screens/NovaDespesaScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen
          name="NovaDespesa"
          component={NovaDespesaScreen}
          options={{ title: "Nova Despesa" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
