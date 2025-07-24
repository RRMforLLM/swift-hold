import { ExportDbButton } from "@/components/ExportDbButton";
import { ResetDbButton } from "@/components/ResetDbButton";
import { initDatabase } from "@/database/migrations";
import { getStores, getUniforms, insertStore, insertUniform } from "@/database/services";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [stores, setStores] = useState<unknown[] | null>(null);
  const [storeName, setStoreName] = useState('');

  useEffect(() => {
    const setup = async () => {
      await initDatabase();
      const fetchedStores = await getStores();
      setStores(fetchedStores);
    };
    setup();
  }, []);

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
    const [uniforms, setUniforms] = useState<unknown[] | null>(null);
    const [uniformType, setUniformType] = useState('');
    const [uniformSize, setUniformSize] = useState('');

    useEffect(() => {
      const fetchUniforms = async () => {
        const fetchedUniforms = await getUniforms();
        setUniforms(fetchedUniforms);
      };
      fetchUniforms();
    }, []);

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

    if (uniforms === null) {
      return (
        <View style={styles.container}>
          <Text>Cargando uniformes...</Text>
        </View>
      );
    };

    if (uniforms.length > 0) {
      return (
        <View style={styles.container}>
          <Text>Uniformes registrados: {uniforms.length}</Text>
        </View>
      );
    };

    if (uniforms.length === 0) {
      return (
        <View style={styles.container}>
          <Text>Registrar nuevo uniforme</Text>
          <TextInput
            placeholder="Tipo de uniforme"
            value={uniformType}
            onChangeText={setUniformType}
            style={{ borderWidth: 1, borderColor: '#ccc', marginVertical: 4, width: 200, padding: 8 }}
          />
          <TextInput
            placeholder="Tamaño"
            value={uniformSize}
            onChangeText={setUniformSize}
            style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 8, width: 200, padding: 8 }}
          />
          <Button title="Registrar" onPress={addUniform} />
          <ExportDbButton />
          <ResetDbButton />
        </View>
      );
    };
  
  if (stores.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Registra tu primera tienda!</Text>
        <TextInput
          placeholder="Nombre de la tienda"
          value={storeName}
          onChangeText={setStoreName}
        />
        <Button title="Registrar" onPress={addStore} />
        <ExportDbButton />
        <ResetDbButton />
      </View>
    )
  };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
