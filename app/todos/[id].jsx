import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function TodoScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Todo ID: {id}</Text>
        </View>
    );
}