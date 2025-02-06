import type { StyleProp, ViewStyle } from "react-native";

export type MotionEventPayload = {
  action: number;
  tilt: number;
  x: number;
  toolType: number;
  pointerCount: number;
  pressure: number;
  y: number;
  velocityX: number;
  timestamp: number;
  orientation: number;
  velocityY: number;
  fps: number;
  target: number;
};

export type GestureDirection = "up" | "down" | "left" | "right";

export type SwipeGesturePayload = {
  type: "swipe";
  direction: GestureDirection;
  velocity: number;
  target: number;
};

export type LongPressGesturePayload = {
  type: "longPress";
  x: number;
  y: number;
  target: number;
};

export type TapGesturePayload = {
  type: "tap";
  x: number;
  y: number;
  target: number;
};

export type ScrollGesturePayload = {
  type: "scroll";
  dx: number;
  dy: number;
  target: number;
};

export type GestureEventPayload =
  | SwipeGesturePayload
  | LongPressGesturePayload
  | TapGesturePayload
  | ScrollGesturePayload;

export type MotionEventModuleEvents = {
  onMotionEvent: (params: MotionEventPayload) => void;
  onGestureEvent: (params: GestureEventPayload) => void;
};

export type MotionEventViewProps = {
  onMotionEvent: (event: { nativeEvent: MotionEventPayload }) => void;
  onGestureEvent: (event: { nativeEvent: GestureEventPayload }) => void;
  targetFPS?: number;
  style?: StyleProp<ViewStyle>;
};
