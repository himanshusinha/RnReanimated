import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const App = () => {
  const animatedValue = useSharedValue(1);
  const animatedHeight = useSharedValue(100);
  const animatedWidth = useSharedValue(100);
  //hook
  //useState render ui changes lekin animatedValue animation ko update karega bina re-render kiye
  //animatedValue.value = animatedValue.value + 1; // ye animation ko change karega lekin ui ko re-render nahi karega

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
      height: animatedHeight.value,
      width: animatedWidth.value,
    };
  });

  const toggle = () => {
    // use exact assignment, and sensible heights for visible change
    if (animatedValue.value === 1) {
      // go to small & semi-transparent
      animatedValue.value = withTiming(0.5, { duration: 700 });
      animatedHeight.value = withSpring(100);
      animatedWidth.value = withSpring(100);
    } else {
      // restore to full size and opacity
      animatedValue.value = withTiming(1, { duration: 700 });
      animatedHeight.value = withSpring(50);
      animatedWidth.value = withSpring(50);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[
          { width: 100, height: 100, backgroundColor: 'red', marginBottom: 20 },
          animatedStyle,
        ]}
      ></Animated.View>
      <TouchableOpacity onPress={toggle}>
        <Text>Change Opacity</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
