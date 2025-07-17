import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Button, Pressable, StyleSheet, View } from 'react-native';
//for commiting
export default function HomeScreen() {
  const [option, setOption] = useState<'a' | 'b' | null>(null);
  const [text, setText] = useState('');
  const [selection, setSelection] = useState<string>('');

  const handleSubmit = () => {
    console.log({ option, text, selection });
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.field}>
        <ThemedText type="defaultSemiBold">Operación:</ThemedText>
        <View style={styles.optionsContainer}>
          <Pressable 
            style={[styles.option, option === 'a' && styles.selectedOption]} 
            onPress={() => setOption('a')}>
            <ThemedText>Entrada</ThemedText>
          </Pressable>
          <Pressable 
            style={[styles.option, option === 'b' && styles.selectedOption]} 
            onPress={() => setOption('b')}>
            <ThemedText>Salida</ThemedText>
          </Pressable>
        </View>
      </View>

      <View style={styles.field}>
        <ThemedText type="defaultSemiBold">Concepto:</ThemedText>
        <ThemedInput
          value={text}
          onChangeText={setText}
          placeholder="Concepto"
        />
      </View>

      <View style={styles.field}>
        <ThemedText type="defaultSemiBold">Artículo:</ThemedText>
        <View style={styles.selectContainer}>
          {['Choice 1', 'Choice 2', 'Choice 3'].map((choice) => (
            <Pressable
              key={choice}
              style={[styles.selectOption, selection === choice && styles.selectedOption]}
              onPress={() => setSelection(choice)}>
              <ThemedText>{choice}</ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <Button title="Submit" onPress={handleSubmit} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 24,
    justifyContent: 'center',
  },
  field: {
    gap: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#A1CEDC',
  },

  selectContainer: {
    gap: 8,
  },
  selectOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
});
