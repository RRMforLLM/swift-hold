import { ExportDbButton } from "@/components/ExportDbButton";
import { ResetDbButton } from "@/components/ResetDbButton";
import { initDatabase } from "@/database/migrations";
import { getOperations, getStores, getUniforms, insertOperation, insertStore, insertUniform } from "@/database/services";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [stores, setStores] = useState<unknown[] | null>(null);
  const [storeName, setStoreName] = useState('');
  const [uniforms, setUniforms] = useState<unknown[] | null>(null);
  const [uniformType, setUniformType] = useState('');
  const [uniformSize, setUniformSize] = useState('');
  const [operations, setOperations] = useState<unknown[] | null>(null);
  const [operationStore, setOperationStore] = useState<string | null>(null);
  const [operationType, setOperationType] = useState('');
  const [operationConcept, setOperationConcept] = useState('');
  const [operationUniform, setOperationUniform] = useState<string | null>(null);
  const [operationQuantity, setOperationQuantity] = useState('');
  const [operationDate, setOperationDate] = useState(new Date().toISOString().split('T')[0]);


  useEffect(() => {
    const setup = async () => {
      await initDatabase();
      const fetchedStores = await getStores();
      setStores(fetchedStores);
    };
    setup();
  }, []);

  useEffect(() => {
    const fetchUniforms = async () => {
      if (stores && stores.length > 0) {
        const fetchedUniforms = await getUniforms();
        setUniforms(fetchedUniforms);
      }
    };
    fetchUniforms();
  }, [stores]);

  useEffect(() => {
    const fetchOperations = async () => {
      if (uniforms && uniforms.length > 0) {
        const fetchedOperations = await getOperations();
        setOperations(fetchedOperations);
      }
    };
    fetchOperations();
  }, [uniforms]);

  const addStore = async () => {
    if (!storeName.trim()) return;
    
    try {
      await insertStore({ name: storeName.trim() });
      const updatedStores = await getStores();
      setStores(updatedStores);
      setStoreName('');
    } catch (error) {
      console.error('Error adding store:', error);
    }
  };

  const addUniform = async () => {
    if (!uniformType.trim() || !uniformSize.trim()) return;
    try {
      await insertUniform({ type: uniformType.trim(), size: uniformSize.trim() });
      const updatedUniforms = await getUniforms();
      setUniforms(updatedUniforms);
      setUniformType('');
      setUniformSize('');
    } catch (error) {
      console.error('Error adding uniform:', error);
    }
  };

  const addOperation = async () => {
    if (!operationStore || !operationType || !operationConcept || !operationUniform || !operationQuantity) return;
    
    try {
      await insertOperation({
        store: parseInt(operationStore),
        operation: operationType === 'entry',
        concept: operationConcept.trim(),
        uniform: parseInt(operationUniform),
        quantity: parseInt(operationQuantity),
        date: operationDate
      });
      const updatedOperations = await getOperations();
      setOperations(updatedOperations);
      setOperationStore(null);
      setOperationType('');
      setOperationConcept('');
      setOperationUniform(null);
      setOperationQuantity('');
      setOperationDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error adding operation:', error);
    }
  };

  if (stores === null) {
    return (
      <View style={styles.container}>
        <Text>Cargando tiendas...</Text>
        <ExportDbButton />
        <ResetDbButton />
      </View>
    )
  };

  if (stores.length > 0) {
    if (uniforms === null) {
      return (
        <View style={styles.container}>
          <Text>Cargando uniformes...</Text>
        </View>
      );
    }

    if (uniforms.length > 0) {
      if (operations === null) {
        return (
          <View style={styles.container}>
            <Text>Cargando operaciones...</Text>
          </View>
        );
      }

      return (
        <View style={styles.container}>
          <Text style={{ marginTop: 16 }}>Registrar nueva operación</Text>
          
          <Text>Tienda:</Text>
          <View style={{ flexDirection: 'row', marginVertical: 8 }}>
            {stores.map((store: any) => (
              <Button
                key={store.id}
                title={store.name}
                onPress={() => setOperationStore(store.id.toString())}
                color={operationStore === store.id.toString() ? '#007AFF' : '#8E8E93'}
              />
            ))}
          </View>

          <Text>Tipo de operación:</Text>
          <View style={{ flexDirection: 'row', marginVertical: 8 }}>
            <Button
              title="Entrada"
              onPress={() => setOperationType('entry')}
              color={operationType === 'entry' ? '#007AFF' : '#8E8E93'}
            />
            <Button
              title="Salida"
              onPress={() => setOperationType('exit')}
              color={operationType === 'exit' ? '#007AFF' : '#8E8E93'}
            />
          </View>

          <TextInput
            placeholder="Concepto"
            value={operationConcept}
            onChangeText={setOperationConcept}
            style={styles.input}
          />

          <Text>Uniforme:</Text>
          <View style={{ flexDirection: 'row', marginVertical: 8, flexWrap: 'wrap' }}>
            {uniforms.map((uniform: any) => (
              <Button
                key={uniform.id}
                title={`${uniform.type} - ${uniform.size}`}
                onPress={() => setOperationUniform(uniform.id.toString())}
                color={operationUniform === uniform.id.toString() ? '#007AFF' : '#8E8E93'}
              />
            ))}
          </View>

          <TextInput
            placeholder="Cantidad"
            value={operationQuantity}
            onChangeText={setOperationQuantity}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            placeholder="Fecha (YYYY-MM-DD)"
            value={operationDate}
            onChangeText={setOperationDate}
            style={styles.input}
          />

          <Button title="Registrar Operación" onPress={addOperation} />
          <ExportDbButton />
          <ResetDbButton />
          {operations.length > 0 && (
            <View style={{ marginVertical: 16, width: '100%' }}>
              {operations.slice(-5).map((op: any) => (
                <Text key={op.id} style={{ marginBottom: 4 }}>
                  {op.operation ? 'Entrada' : 'Salida'} - {op.concept} (Cantidad: {op.quantity} - {op.uniform.type} - {op.uniform.size}) en {op.store.name} el {new Date(op.date).toLocaleDateString()}
                </Text>
              ))}
            </View>
          )}
        </View>
      );
    }

    if (uniforms.length === 0) {
      return (
        <View style={styles.container}>
          <Text>Registrar nuevo uniforme</Text>
          <TextInput
            placeholder="Tipo de uniforme"
            value={uniformType}
            onChangeText={setUniformType}
            style={styles.input}
          />
          <TextInput
            placeholder="Tamaño"
            value={uniformSize}
            onChangeText={setUniformSize}
            style={styles.input}
          />
          <Button title="Registrar" onPress={addUniform} />
          <ExportDbButton />
          <ResetDbButton />
        </View>
      );
    }
  }
  
  if (stores.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Registra tu primera tienda!</Text>
        <TextInput
          placeholder="Nombre de la tienda"
          value={storeName}
          onChangeText={setStoreName}
          style={styles.input}
        />
        <Button title="Registrar" onPress={addStore} />
        <ExportDbButton />
        <ResetDbButton />
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 4,
    width: 200,
    padding: 8,
  }
})
