import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/ThemeContext';
import { StatusBar } from 'react-native';
import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter';
import {Octicons} from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function TodoScreen() {
    const { id } = useLocalSearchParams();
    const [toDo, setToDo] = useState({});
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
    const router = useRouter();

    const [loaded, error] = useFonts({
        Inter_500Medium,
    })

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const jsonValue = await AsyncStorage.getItem("TodoApp")
                const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null

                if (storageTodos && storageTodos.length) {
                    const myTodo = storageTodos.find(todo => todo.id.toString() === id)
                    setToDo(myTodo)
                }
            } catch {
                console.error(e)
            }
        }
    }, [])
    // check localStorage and filters by ID then set itt in state so we can operate

    if (!loaded && !error) {
        return null
    }


    return (
        <View>
            <Text>Todo ID: {id}</Text>
        </View>
    );
}