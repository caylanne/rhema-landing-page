import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

// Entrada suave: aparece e sobe um pouco. Usado só no convite principal.
export default function Reveal({ children, delay = 0, style }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 1400, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, []);
  return (
    <Animated.View style={[style, { opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }] }]}>
      {children}
    </Animated.View>
  );
}
