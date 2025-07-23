import { ExportDbButton } from "@/components/ExportDbButton";
import { ResetDbButton } from "@/components/ResetDbButton";
import { initDatabase } from "@/database/migrations";
import { getStores, insertStore } from "@/database/services";
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
  }

  if (stores === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
        <ExportDbButton />
        <ResetDbButton />
      </View>
    )
  };

  if (stores.length > 0) {
    return (
      <View style={styles.container}>
        <Text>The user has {stores.length} stores</Text>
        <ExportDbButton />
        <ResetDbButton />
      </View>
    )
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})