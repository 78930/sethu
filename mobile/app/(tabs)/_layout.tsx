import { Tabs } from 'expo-router';
import { BriefcaseBusiness, ChartColumnBig, CircleUserRound, MapPinned, MessageSquareText, RectangleEllipsis } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen name="jobs" options={{ title: 'Jobs', tabBarIcon: ({ color, size }) => <BriefcaseBusiness color={color} size={size} /> }} />
      <Tabs.Screen name="map" options={{ title: 'Areas', tabBarIcon: ({ color, size }) => <MapPinned color={color} size={size} /> }} />
      <Tabs.Screen name="applications" options={{ title: 'Applied', tabBarIcon: ({ color, size }) => <RectangleEllipsis color={color} size={size} /> }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat', tabBarIcon: ({ color, size }) => <MessageSquareText color={color} size={size} /> }} />
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard', tabBarIcon: ({ color, size }) => <ChartColumnBig color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <CircleUserRound color={color} size={size} /> }} />
    </Tabs>
  );
}
