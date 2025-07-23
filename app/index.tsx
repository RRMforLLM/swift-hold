import { ExportDbButton } from "@/components/ExportDbButton";
import { ResetDbButton } from "@/components/ResetDbButton";
import { initDatabase } from "@/database/migrations";
import { getStores } from "@/database/services";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [stores, setStores] = useState<unknown[] | null>(null);

  useEffect(() => {
    const setup = async () => {
      await initDatabase();
      const fetchedStores = await getStores();
      setStores(fetchedStores);
    };
    setup();
  }, []);

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>The user has {stores.length} stores</Text>
        <ExportDbButton />
        <ResetDbButton />
      </View>
    )
  };
  
  if (stores.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>The user has no stores</Text>
        <ExportDbButton />
        <ResetDbButton />
      </View>
    )
  };
}
