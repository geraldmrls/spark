import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Discover" options={{ title: "Discover" }} />
      <Tabs.Screen name="Messages" options={{ title: "Messages" }} />
      <Tabs.Screen name="Profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
