import { getStores } from "@/database/services";
import { Text, View } from "react-native";

export default function Index() {
  const stores = getStores();
  if (!stores) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>The user has no stores</Text>
      </View>
    )
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>The user has stores</Text>
      </View>
    )
  }
}
