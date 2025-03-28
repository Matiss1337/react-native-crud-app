import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {useState} from "react";
import {data} from "@/data/todo";

export default function RootLayout() {
    const [toDos, setToDos] = useState(data.sort((a, b) => b.id - a.id));
    const [text, setText] = useState("");

    const addToDo = () => {
        if (text.trim()) {
            // if input not empty
            const newId = toDos.lenght > 0 ? toDos[0].id + 1 : 1;
            setToDos([{id: newId, title: text, completed: false}, ...toDos]);
            setText("");
        }
    }
    // add todo

    const toggleTodo = (id) => {
        setToDos(toDos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    }
    // toggle todo based on id

    const removeTodo = (id) => {
        setToDos(toDos.filter(todo => todo.id !== id));
    }
    // delete todo by filtering ids and leaving all that dont match

    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Home",
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    );
}