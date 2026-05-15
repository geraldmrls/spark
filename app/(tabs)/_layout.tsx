import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

// svg
import DiscoverIcon from "../../assets/svg/discover.svg";
import MessagesIcon from "../../assets/svg/messages.svg";
import ProfileIcon from "../../assets/svg/profile.svg";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#d4a373",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
        tabBarActiveBackgroundColor: "#eef3ea",
        tabBarItemStyle: {
          borderRadius: 16,
        },
      }}
    >
      {/* discover */}
      <Tabs.Screen
        name="Discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ focused, color }) => {
            return (
              <DiscoverIcon
                style={styles.tabButtons}
                width={24}
                height={24}
                opacity={focused ? 1 : 0.5}
                color={color}
              />
            );
          },
        }}
      />

      {/* messages */}
      <Tabs.Screen
        name="Messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ focused, color }) => {
            return (
              <MessagesIcon
                width={24}
                height={24}
                opacity={focused ? 1 : 0.5}
                color={color}
              />
            );
          },
        }}
      />

      {/* profile */}
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => {
            return (
              <ProfileIcon
                width={24}
                height={24}
                opacity={focused ? 1 : 0.5}
                color={color}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabButtons: {
    borderColor: "#d4a373",
  },
});
