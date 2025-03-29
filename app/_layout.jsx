// Import necessary components and providers
import { Stack } from "expo-router";  // Navigation container from Expo
import { SafeAreaProvider } from "react-native-safe-area-context";  // Handles safe areas on different devices
import { ThemeProvider } from "@/context/ThemeContext";  // Custom theme provider for dark/light mode

// Root layout component that wraps the entire app
export default function RootLayout() {
    return (
        // ThemeProvider: Manages and provides theme context to all child components
        <ThemeProvider>
            {/* SafeAreaProvider: Ensures content is displayed within safe boundaries */}
            <SafeAreaProvider>
                {/* Stack: Handles navigation and screen transitions */}
                <Stack screenOptions={{headerShown: false}}>
                    {/* Define the initial screen with no header */}
                    <Stack.Screen name="index"/>
                    <Stack.Screen name="todos/[id]" options={{ title: 'Todo Details' }} />
                    {/*dynamic routing*/}
                </Stack>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}

{/* Stack: Handles navigation and screen transitions
    - Works like a stack of cards/pages where new screens are placed on top
    - Provides built-in animations and gestures (swipe back on iOS)
    - Automatically adds back buttons when you navigate to new screens
    - Common examples:
      Home -> Product Details -> Shopping Cart
      Each "->" represents a new screen pushed onto the stack
    - Similar to how web browsers handle history:
      When you click "back", it removes the top screen
    - In this app, "index" is the first screen (home page)
    - You can add more screens as siblings to "index" using <Stack.Screen>
*/}