// Import necessary hooks and utilities
import { createContext, useState } from 'react'
import { Appearance} from "react-native"  // Utility to detect device theme
import { Colors } from '../constants/Colors'  // Import your theme colors

// Step 1: Create a context object with empty default value
// This will hold our theme-related data and be accessed by components
export const ThemeContext = createContext({});

// Step 2: Create a provider component that will wrap your app
// This component manages the theme state and provides it to all children
export const ThemeProvider = ({ children }) => {
    // Step 3: Set up theme state using the device's current color scheme
    // getColorScheme() returns either 'light' or 'dark'
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

    // Step 4: Determine the active theme based on colorScheme
    // Use the appropriate color palette from your Colors constants
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    // Step 5: Provide theme data to all child components
    // value prop contains all data that will be available to consumers
    return (
        <ThemeContext.Provider value={{
            theme,              // Current theme colors
            colorScheme,       // Current color scheme ('light' or 'dark')
            setColorScheme     // Function to manually change the theme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}