import { Tabs } from 'expo-router';
import { View, Dimensions, Pressable, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Compass, Heart, Calendar, MessageCircle } from 'lucide-react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_WIDTH = SCREEN_WIDTH * 0.9;

const icons = {
  index: Compass,
  favorites: Heart,
  bookings: Calendar,
  profile: MessageCircle,
};

const labels = {
  index: 'Discover',
  favorites: 'Favorites',
  bookings: 'Bookings',
  profile: 'Messages',
};

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 24,
        width: TAB_BAR_WIDTH,
        left: (SCREEN_WIDTH - TAB_BAR_WIDTH) / 2,
        height: 64,
        borderRadius: 40,
        overflow: 'hidden',
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      }}
    >
      <BlurView
        intensity={100}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderRadius: 40,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.15)',
        }}
      >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const Icon = icons[route.name as keyof typeof icons];
        const label = labels[route.name as keyof typeof labels];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
            }}
          >
            <Icon
              size={22}
              color={isFocused ? '#FFFFFF' : '#A3A3A3'}
              strokeWidth={isFocused ? 2 : 1.5}
            />
            <Text
              style={{
                fontSize: 11,
                fontWeight: '500',
                color: isFocused ? '#FFFFFF' : '#A3A3A3',
                marginTop: 4,
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
      </BlurView>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="favorites" />
      <Tabs.Screen name="bookings" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
