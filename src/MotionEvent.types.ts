import type { StyleProp, ViewStyle } from "react-native";

export type MotionEventPayload = {
  action: number;
  x: number;
  y: number;
  pressure: number;
  pointerCount: number;
};

export type MotionEventModuleEvents = {
  onMotionEvent: (params: MotionEventPayload) => void;
};

export type MotionEventViewProps = {
  onMotionEvent: (event: { nativeEvent: MotionEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};
