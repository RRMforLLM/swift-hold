import ExportDbButton from '@/components/ExportDbButton';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedModal } from '@/components/ThemedModal';
import { ThemedPressable } from '@/components/ThemedPressable';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { initDatabase } from '@/database/migrations';
import { getUniforms, insertOperation, insertUniform } from '@/database/services';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';

interface Uniform {
  id: number;
  type: string;
  size: string;
}

export default function HomeScreen() {
  useEffect(() => {
    initDatabase();
    loadUniforms();
  }, []);

  const [option, setOption] = useState<'a' | 'b' | null>(null);
  const [text, setText] = useState('');
  const [uniforms, setUniforms] = useState<Uniform[]>([]);
  const [selectedUniform, setSelectedUniform] = useState<Uniform | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newType, setNewType] = useState('');
  const [newSize, setNewSize] = useState('');

  const loadUniforms = async () => {
    try {
      const result = await getUniforms();
      setUniforms(result as Uniform[]);
    } catch (err) {
      console.error('❌ Failed to load uniforms:', err);
    }
  };

  const handleAddUniform = async () => {
    if (!newType || !newSize) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    try {
      await insertUniform({ type: newType, size: newSize });
      setModalVisible(false);
      setNewType('');
      setNewSize('');
      loadUniforms();
    } catch (err) {
      console.error('❌ Failed to add uniform:', err);
      Alert.alert('Error', 'No se pudo agregar el uniforme');
    }
  };

  const handleSubmit = async () => {
    if (!selectedUniform) {
      Alert.alert('Error', 'Por favor seleccione un artículo');
      return;
    }

    try {
      await insertOperation({
        operation: option === 'a', // 'Entrada' = true
        uniform: selectedUniform.id,
        store: text,
        quantity: 1, // you can add a field for this
        date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      });
    } catch (err) {
      console.error('❌ Failed to submit:', err);
      Alert.alert('Error', 'No se pudo guardar la operación');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.field}>
        <ThemedText type="defaultSemiBold">Operación:</ThemedText>
        <View style={styles.optionsContainer}>
          <ThemedPressable 
            style={[styles.option, option === 'a' && styles.selectedOption]} 
            onPress={() => setOption('a')}>
            <ThemedText>Entrada</ThemedText>
          </ThemedPressable>
          <ThemedPressable 
            style={[styles.option, option === 'b' && styles.selectedOption]} 
            onPress={() => setOption('b')}>
            <ThemedText>Salida</ThemedText>
          </ThemedPressable>
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
          {uniforms.map((uniform) => (
            <ThemedPressable
              key={uniform.id}
              style={[styles.selectOption, selectedUniform?.id === uniform.id && styles.selectedOption]}
              onPress={() => setSelectedUniform(uniform)}>
              <ThemedText>{`${uniform.type} - ${uniform.size}`}</ThemedText>
            </ThemedPressable>
          ))}
          <ThemedPressable
            style={styles.addButton}
            onPress={() => setModalVisible(true)}>
            <ThemedText>+ Agregar nuevo artículo</ThemedText>
          </ThemedPressable>
        </View>
      </View>

      <Button title="Submit" onPress={handleSubmit} />

      <ThemedModal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
            <ThemedText type="defaultSemiBold">Nuevo Artículo</ThemedText>
            
            <View style={styles.field}>
              <ThemedText type="defaultSemiBold">Tipo:</ThemedText>
              <ThemedInput
                value={newType}
                onChangeText={setNewType}
                placeholder="Tipo de uniforme"
              />
            </View>

            <View style={styles.field}>
              <ThemedText type="defaultSemiBold">Talla:</ThemedText>
              <ThemedInput
                value={newSize}
                onChangeText={setNewSize}
                placeholder="Talla"
              />
            </View>

            <View style={styles.modalButtons}>
              <ThemedPressable 
                style={[styles.option, { flex: 0.45 }]} 
                onPress={() => setModalVisible(false)}>
                <ThemedText>Cancelar</ThemedText>
              </ThemedPressable>
              <ThemedPressable 
                style={[styles.option, styles.selectedOption, { flex: 0.45 }]} 
                onPress={handleAddUniform}>
                <ThemedText>Guardar</ThemedText>
              </ThemedPressable>
            </View>
      </ThemedModal>
      <ExportDbButton />
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
  addButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});
