import React from 'react';
import { View, Text } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors } from '@theme';

interface TrustSignalItemProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
}

export function TrustSignalItem({
  icon: Icon,
  iconColor = colors.primary,
  title,
  description,
}: TrustSignalItemProps) {
  return (
    <View className="flex-row items-center gap-4 py-4">
      <View
        className="w-14 h-14 rounded-full items-center justify-center"
        style={{ backgroundColor: `${iconColor}15` }}
      >
        <Icon size={24} color={iconColor} />
      </View>
      <View className="flex-1 gap-1">
        <Text className="text-base font-semibold text-gray-900 leading-[22px]">
          {title}
        </Text>
        <Text className="text-sm text-gray-500 leading-5">
          {description}
        </Text>
      </View>
    </View>
  );
}
