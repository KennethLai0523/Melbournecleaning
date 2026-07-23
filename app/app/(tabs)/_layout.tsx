import { Tabs } from 'expo-router';
import { TabIcon } from '../../src/components/TabIcon';
import { colors } from '../../src/theme';
import { AppHeader } from '../../src/components/AppHeader';
import { AuthModal } from '../../src/components/AuthModal';

export default function TabLayout() {
  return (
    <>
    <Tabs
      screenOptions={{
        header: () => <AppHeader />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { height: 68, paddingBottom: 12, paddingTop: 5 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ color }) => <TabIcon name="services" color={color} />,
        }}
      />
      <Tabs.Screen
        name="quote"
        options={{
          title: 'Quote',
          tabBarIcon: ({ color }) => <TabIcon name="quote" color={color} />,
        }}
      />
      <Tabs.Screen
        name="areas"
        options={{
          title: 'Areas',
          tabBarIcon: ({ color }) => <TabIcon name="areas" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <TabIcon name="account" color={color} />,
        }}
      />
    </Tabs>
    <AuthModal />
    </>
  );
}
