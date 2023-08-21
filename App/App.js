import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./navigation/StackNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginProvider from "./components/LoginProvider";

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <StackNavigation />
        </SafeAreaProvider>
      </NavigationContainer>
    </LoginProvider>
  );
}
