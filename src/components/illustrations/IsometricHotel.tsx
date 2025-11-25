import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import Svg, {
  Path,
  Rect,
  G,
  Defs,
  LinearGradient,
  Stop,
  Ellipse,
} from 'react-native-svg';

interface IsometricHotelProps {
  width?: number;
  height?: number;
}

export function IsometricHotel({ width = 280, height = 280 }: IsometricHotelProps) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View className="items-center justify-center">
      {/* Shadow */}
      <Animated.View
        className="absolute bottom-0"
        style={{
          opacity: fadeAnim,
          transform: [
            {
              scale: floatAnim.interpolate({
                inputRange: [-8, 0],
                outputRange: [0.9, 1],
              }),
            },
          ],
        }}
      >
        <Svg width={180} height={40} viewBox="0 0 180 40">
          <Ellipse cx="90" cy="20" rx="85" ry="18" fill="#E5E5E5" opacity={0.5} />
        </Svg>
      </Animated.View>

      {/* Hotel Building */}
      <Animated.View
        className="z-10"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: floatAnim }],
        }}
      >
        <Svg width={width} height={height} viewBox="0 0 280 280">
          <Defs>
            {/* Building gradients */}
            <LinearGradient id="buildingFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#8B7355" />
              <Stop offset="100%" stopColor="#6B5344" />
            </LinearGradient>
            <LinearGradient id="buildingSide" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#5D4537" />
              <Stop offset="100%" stopColor="#4A372C" />
            </LinearGradient>
            <LinearGradient id="roofTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#9B8B7B" />
              <Stop offset="100%" stopColor="#8B7B6B" />
            </LinearGradient>
            <LinearGradient id="window" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#87CEEB" />
              <Stop offset="100%" stopColor="#5BA3C6" />
            </LinearGradient>
            <LinearGradient id="treeGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#4A7C59" />
              <Stop offset="100%" stopColor="#2D5A3D" />
            </LinearGradient>
            <LinearGradient id="treeTrunk" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#8B6914" />
              <Stop offset="100%" stopColor="#654321" />
            </LinearGradient>
            <LinearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#90EE90" />
              <Stop offset="100%" stopColor="#228B22" />
            </LinearGradient>
          </Defs>

          {/* Ground/Base */}
          <G transform="translate(40, 200)">
            <Path
              d="M100 0 L200 50 L100 100 L0 50 Z"
              fill="url(#ground)"
            />
          </G>

          {/* Main Building - Back Section */}
          <G transform="translate(70, 60)">
            {/* Left face */}
            <Path
              d="M0 50 L0 150 L60 180 L60 80 Z"
              fill="url(#buildingSide)"
            />
            {/* Front face */}
            <Path
              d="M60 80 L60 180 L140 140 L140 40 Z"
              fill="url(#buildingFront)"
            />
            {/* Roof */}
            <Path
              d="M0 50 L60 80 L140 40 L80 10 Z"
              fill="url(#roofTop)"
            />

            {/* Windows - Front */}
            <Rect x="70" y="55" width="18" height="22" rx="2" fill="url(#window)" />
            <Rect x="95" y="55" width="18" height="22" rx="2" fill="url(#window)" />
            <Rect x="120" y="45" width="14" height="18" rx="2" fill="url(#window)" />

            <Rect x="70" y="85" width="18" height="22" rx="2" fill="url(#window)" />
            <Rect x="95" y="85" width="18" height="22" rx="2" fill="url(#window)" />
            <Rect x="120" y="70" width="14" height="18" rx="2" fill="url(#window)" />

            <Rect x="70" y="115" width="18" height="22" rx="2" fill="url(#window)" />
            <Rect x="95" y="115" width="18" height="22" rx="2" fill="url(#window)" />

            {/* Windows - Side */}
            <Rect x="10" y="70" width="14" height="18" rx="2" fill="url(#window)" opacity={0.7} />
            <Rect x="30" y="80" width="14" height="18" rx="2" fill="url(#window)" opacity={0.7} />
            <Rect x="10" y="100" width="14" height="18" rx="2" fill="url(#window)" opacity={0.7} />
            <Rect x="30" y="110" width="14" height="18" rx="2" fill="url(#window)" opacity={0.7} />
            <Rect x="10" y="130" width="14" height="18" rx="2" fill="url(#window)" opacity={0.7} />
            <Rect x="30" y="140" width="14" height="18" rx="2" fill="url(#window)" opacity={0.7} />
          </G>

          {/* Front Tower Section */}
          <G transform="translate(120, 90)">
            {/* Left face */}
            <Path
              d="M0 30 L0 120 L40 140 L40 50 Z"
              fill="#4A372C"
            />
            {/* Front face */}
            <Path
              d="M40 50 L40 140 L100 110 L100 20 Z"
              fill="#6B5344"
            />
            {/* Roof */}
            <Path
              d="M0 30 L40 50 L100 20 L60 0 Z"
              fill="#7B6B5B"
            />

            {/* Tower Windows */}
            <Rect x="50" y="35" width="16" height="20" rx="2" fill="url(#window)" />
            <Rect x="72" y="28" width="14" height="16" rx="2" fill="url(#window)" />
            <Rect x="50" y="62" width="16" height="20" rx="2" fill="url(#window)" />
            <Rect x="72" y="52" width="14" height="16" rx="2" fill="url(#window)" />
            <Rect x="50" y="89" width="16" height="20" rx="2" fill="url(#window)" />

            {/* Side Windows */}
            <Rect x="8" y="50" width="12" height="14" rx="2" fill="url(#window)" opacity={0.6} />
            <Rect x="22" y="58" width="12" height="14" rx="2" fill="url(#window)" opacity={0.6} />
            <Rect x="8" y="75" width="12" height="14" rx="2" fill="url(#window)" opacity={0.6} />
            <Rect x="22" y="83" width="12" height="14" rx="2" fill="url(#window)" opacity={0.6} />
          </G>

          {/* Tree on the left */}
          <G transform="translate(30, 160)">
            {/* Trunk */}
            <Rect x="18" y="35" width="8" height="25" fill="url(#treeTrunk)" />
            {/* Foliage layers */}
            <Ellipse cx="22" cy="25" rx="20" ry="18" fill="#3D6B4F" />
            <Ellipse cx="22" cy="18" rx="16" ry="14" fill="#4A7C59" />
            <Ellipse cx="22" cy="12" rx="12" ry="10" fill="#5A8C69" />
          </G>

          {/* Tree on the right */}
          <G transform="translate(200, 180)">
            {/* Trunk */}
            <Rect x="12" y="25" width="6" height="18" fill="url(#treeTrunk)" />
            {/* Foliage layers */}
            <Ellipse cx="15" cy="18" rx="14" ry="12" fill="#3D6B4F" />
            <Ellipse cx="15" cy="12" rx="11" ry="9" fill="#4A7C59" />
            <Ellipse cx="15" cy="8" rx="8" ry="6" fill="#5A8C69" />
          </G>

          {/* Small bush */}
          <G transform="translate(55, 215)">
            <Ellipse cx="10" cy="8" rx="12" ry="8" fill="#4A7C59" />
            <Ellipse cx="10" cy="5" rx="8" ry="5" fill="#5A8C69" />
          </G>

          {/* Entrance/Door */}
          <G transform="translate(155, 195)">
            <Rect x="0" y="0" width="20" height="28" rx="2" fill="#4A372C" />
            <Rect x="3" y="3" width="14" height="22" rx="1" fill="#2D2318" />
          </G>

          {/* Decorative elements - small windows glowing */}
          <G transform="translate(165, 140)">
            <Rect x="0" y="0" width="4" height="4" rx="1" fill="#FFE4B5" opacity={0.8} />
          </G>
          <G transform="translate(185, 130)">
            <Rect x="0" y="0" width="4" height="4" rx="1" fill="#FFE4B5" opacity={0.8} />
          </G>
        </Svg>
      </Animated.View>
    </View>
  );
}
