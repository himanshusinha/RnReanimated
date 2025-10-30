import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const App = () => {
  const animatedValue = useSharedValue(1);
  //hook
  //useState render ui changes lekin animatedValue animation ko update karega bina re-render kiye
  //animatedValue.value = animatedValue.value + 1; // ye animation ko change karega lekin ui ko re-render nahi karega

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    };
  });
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[
          { width: 100, height: 100, backgroundColor: 'red', marginBottom: 20 },
          animatedStyle,
        ]}
      ></Animated.View>
      <TouchableOpacity
        onPress={() => {
          if (animatedValue.value == 1) {
            animatedValue.value = withTiming(0.5, { duration: 700 });
          } else {
            animatedValue.value == withTiming(1, { duration: 500 });
          }
        }}
      >
        <Text>Change Opacity</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
