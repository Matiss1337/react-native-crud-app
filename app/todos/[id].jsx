// Import necessary components and hooks from React Native and other libraries
import { useLocalSearchParams } from "expo-router"; // For getting URL parameters
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native' // Basic UI components
import { useState, useEffect, useContext } from 'react' // React hooks
import { SafeAreaView } from "react-native-safe-area-context"; // Handles safe areas on iOS
import { ThemeContext } from "@/context/ThemeContext"; // Theme context for dark/light mode
import { StatusBar } from "expo-status-bar"; // Controls status bar appearance
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter"; // Custom font
import Octicons from "@expo/vector-icons/Octicons"; // Icon library
import AsyncStorage from "@react-native-async-storage/async-storage"; // Local storage
import { useRouter } from "expo-router"; // Navigation

export default function EditScreen() {
    // Get the todo ID from URL parameters
    const { id } = useLocalSearchParams()
    // State to store the current todo
    const [todo, setTodo] = useState({})
    // Get theme context values
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
    // Initialize router for navigation
    const router = useRouter()

    // Load custom font
    const [loaded, error] = useFonts({
        Inter_500Medium,
    })

    // Effect to fetch todo data when component mounts or ID changes
    useEffect(() => {
        const fetchData = async (id) => {
            try {
                // Get todos from storage
                const jsonValue = await AsyncStorage.getItem("TodoApp")
                const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null

                // Find the specific todo by ID and set it in state
                if (storageTodos && storageTodos.length) {
                    const myTodo = storageTodos.find(todo => todo.id.toString() === id)
                    setTodo(myTodo)
                }
            } catch (e) {
                console.error(e)
            }
        }

        fetchData(id)
    }, [id])

    // Return null while font is loading
    if (!loaded && !error) {
        return null
    }

    // Get styles based on current theme
    const styles = createStyles(theme, colorScheme)

    // Handle saving updated todo
    const handleSave = async () => {
        try {
            // Create updated todo object
            const savedTodo = { ...todo, title: todo.title }

            // Get current todos from storage
            const jsonValue = await AsyncStorage.getItem('TodoApp')
            const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null

            if (storageTodos && storageTodos.length) {
                // Remove old version of this todo
                const otherTodos = storageTodos.filter(todo => todo.id !== savedTodo.id)
                // Add updated version
                const allTodos = [...otherTodos, savedTodo]
                // Save back to storage
                await AsyncStorage.setItem('TodoApp', JSON.stringify(allTodos))
            } else {
                // If no todos exist, create new array with this todo
                await AsyncStorage.setItem('TodoApp', JSON.stringify([savedTodo]))
            }

            // Navigate back to home screen
            router.push('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Input container with edit field and theme toggle */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    maxLength={30}
                    placeholder="Edit todo"
                    placeholderTextColor="gray"
                    value={todo?.title || ''} // Use optional chaining in case todo is null
                    onChangeText={(text) => setTodo(prev => ({ ...prev, title: text }))}
                />
                {/* Theme toggle button */}
                <Pressable
                    onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
                    style={{ marginLeft: 10 }}>
                    <Octicons
                        name={colorScheme === 'dark' ? "moon" : "sun"}
                        size={36}
                        color={theme.text}
                        selectable={undefined}
                        style={{ width: 36 }}
                    />
                </Pressable>
            </View>
            {/* Buttons container */}
            <View style={styles.inputContainer}>
                <Pressable
                    onPress={handleSave}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
                <Pressable
                    onPress={() => router.push('/')}
                    style={[styles.saveButton, { backgroundColor: 'red' }]}
                >
                    <Text style={[styles.saveButtonText, { color: 'white' }]}>Cancel</Text>
                </Pressable>
            </View>
            {/* Status bar that adapts to theme */}
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </SafeAreaView>
    )
}

// Style creation function that adapts to theme
function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1, // Take up all available space
            width: '100%',
            backgroundColor: theme.background,
        },
        inputContainer: {
            flexDirection: 'row', // Horizontal layout
            alignItems: 'center', // Center items vertically
            padding: 10,
            gap: 6,
            width: '100%',
            maxWidth: 1024, // Maximum width for larger screens
            marginHorizontal: 'auto',
            pointerEvents: 'auto',
        },
        input: {
            flex: 1, // Take up remaining space
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            fontSize: 18,
            fontFamily: 'Inter_500Medium',
            minWidth: 0,
            color: theme.text,
        },
        saveButton: {
            backgroundColor: theme.button,
            borderRadius: 5,
            padding: 10,
        },
        saveButtonText: {
            fontSize: 18,
            color: colorScheme === 'dark' ? 'black' : 'white',
        }
    })
}