import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Settings,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit3,
} from 'lucide-react-native';
import { haptics } from '@/utils/haptics';
import { shadows } from '@/utils/shadows';

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: User, label: 'Personal Information', route: '/profile/personal' },
      { icon: CreditCard, label: 'Payment Methods', route: '/profile/payments' },
      { icon: Bell, label: 'Notifications', route: '/profile/notifications' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help Center', route: '/help' },
      { icon: Shield, label: 'Privacy & Security', route: '/privacy' },
      { icon: Settings, label: 'Settings', route: '/settings' },
    ],
  },
];

export default function ProfileScreen() {
  const handleMenuPress = (route: string) => {
    haptics.light();
    // Navigation will be implemented
    console.log('Navigate to:', route);
  };

  const handleEditProfile = () => {
    haptics.light();
    console.log('Edit profile');
  };

  const handleLogout = () => {
    haptics.medium();
    console.log('Logout');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <Animatable.View animation="fadeIn" duration={400} className="px-5 py-4 bg-white">
          <Text className="text-2xl font-bold text-gray-900">Profile</Text>
        </Animatable.View>

        {/* Profile Card */}
        <Animatable.View
          animation="fadeInUp"
          delay={100}
          duration={500}
          className="bg-white mx-5 mt-4 rounded-2xl p-6 items-center"
          style={shadows.elevation2}
        >
          <View className="relative mb-4">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' }}
              className="w-20 h-20 rounded-full bg-gray-200"
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-secondary items-center justify-center border-2 border-white"
              onPress={handleEditProfile}
              activeOpacity={0.8}
            >
              <Edit3 size={14} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <Text className="text-xl font-semibold text-gray-900 mb-1">John Smith</Text>
          <Text className="text-sm text-gray-500 mb-5">john.smith@email.com</Text>

          <View className="flex-row items-center w-full pt-4 border-t border-gray-100">
            <Animatable.View animation="fadeIn" delay={200} className="flex-1 items-center">
              <Text className="text-xl font-bold text-gray-900 mb-1">12</Text>
              <Text className="text-xs text-gray-500">Bookings</Text>
            </Animatable.View>
            <View className="w-px h-8 bg-gray-200" />
            <Animatable.View animation="fadeIn" delay={300} className="flex-1 items-center">
              <Text className="text-xl font-bold text-gray-900 mb-1">8</Text>
              <Text className="text-xs text-gray-500">Reviews</Text>
            </Animatable.View>
            <View className="w-px h-8 bg-gray-200" />
            <Animatable.View animation="fadeIn" delay={400} className="flex-1 items-center">
              <Text className="text-xl font-bold text-gray-900 mb-1">5</Text>
              <Text className="text-xs text-gray-500">Favorites</Text>
            </Animatable.View>
          </View>
        </Animatable.View>

        {/* Menu Sections */}
        {MENU_SECTIONS.map((section, sectionIndex) => (
          <Animatable.View
            key={sectionIndex}
            animation="fadeInUp"
            delay={200 + sectionIndex * 150}
            duration={500}
            className="mt-6 px-5"
          >
            <Text className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              {section.title}
            </Text>
            <View className="bg-white rounded-2xl overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                const isLast = itemIndex === section.items.length - 1;

                return (
                  <Animatable.View
                    key={itemIndex}
                    animation="fadeIn"
                    delay={300 + sectionIndex * 150 + itemIndex * 50}
                  >
                    <TouchableOpacity
                      className={`flex-row items-center justify-between py-4 px-4 ${
                        !isLast ? 'border-b border-gray-100' : ''
                      }`}
                      onPress={() => handleMenuPress(item.route)}
                      activeOpacity={0.7}
                    >
                      <View className="flex-row items-center gap-3">
                        <View className="w-9 h-9 rounded-lg bg-secondary/10 items-center justify-center">
                          <IconComponent size={20} color="#10B981" strokeWidth={2} />
                        </View>
                        <Text className="text-base text-gray-900 font-medium">
                          {item.label}
                        </Text>
                      </View>
                      <ChevronRight size={20} color="#A3A3A3" strokeWidth={2} />
                    </TouchableOpacity>
                  </Animatable.View>
                );
              })}
            </View>
          </Animatable.View>
        ))}

        {/* Logout Button */}
        <Animatable.View animation="fadeInUp" delay={600} duration={500}>
          <TouchableOpacity
            className="flex-row items-center justify-center gap-2 mx-5 mt-8 py-4 bg-white rounded-xl border border-error/20"
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <LogOut size={20} color="#EF4444" strokeWidth={2} />
            <Text className="text-base font-semibold text-error">Log Out</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Version */}
        <Animatable.Text animation="fadeIn" delay={700} className="text-center text-xs text-gray-400 mt-6">
          Version 1.0.0
        </Animatable.Text>
      </ScrollView>
    </SafeAreaView>
  );
}
