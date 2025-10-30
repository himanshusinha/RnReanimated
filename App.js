import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
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
    if (animatedHeight.value == 100) {
      animatedHeight.value = withRepeat(withSpring(50), -1, true);
      animatedWidth.value = withRepeat(withSpring(50), -1, true);
    } else {
      cancelAnimation(animatedHeight);
      cancelAnimation(animatedWidth);
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
