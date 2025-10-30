import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const App = () => {
  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, [0, 50, 100], [1, 0.5, 1]);
    const backgroundColor = interpolateColor(
      animatedValue.value,
      [0, 50, 100],
      ['red', 'orange', 'yellow'],
    );
    const height = interpolate(
      animatedValue.value,
      [0, 50, 100],
      [100, 50, 100],
    );
    const width = interpolate(
      animatedValue.value,
      [0, 50, 100],
      [100, 50, 100],
    );

    return {
      transform: [{ translateX: animatedValue.value }],
      opacity,
      backgroundColor,
      height,
      width,
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[
          { width: 100, height: 100, backgroundColor: 'red', marginBottom: 20 },
          animatedStyle,
        ]}
      />

      <TouchableOpacity
        style={{ padding: 10, borderWidth: 1 }}
        onPress={() => {
          if (animatedValue.value === 0) {
            animatedValue.value = withTiming(100, { duration: 1000 });
          } else {
            animatedValue.value = withTiming(0, { duration: 1000 });
          }
        }}
      >
        <Text>Start Animation</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
//0-->100
//1-->0.5
