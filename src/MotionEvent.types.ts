import type { ViewProps } from "react-native";

export type PointerCoords = {
  orientation: number;
  pressure: number;
  size: number;
  toolMajor: number;
  toolMinor: number;
  touchMajor: number;
  touchMinor: number;
  x: number;
  y: number;
};

export type PointerProperties = {
  id: number;
  toolType: number;
};

export type MotionEventPayload = {
  action: number;
  actionMasked: number;
  actionIndex: number;
  eventTime: number;
  downTime: number;
  edgeFlags: number;
  deviceId: number;
  source: number;
  pointerCount: number;
  pointerCoords: PointerCoords[];
  pointerProperties: PointerProperties[];
  rawX: number;
  rawY: number;
  xPrecision: number;
  yPrecision: number;
  velocityX: number;
  velocityY: number;
  fps: number;
  target: number;
};

export type MotionEventModuleEvents = {
  onMotionEvent: (params: MotionEventPayload) => void;
};

export type MotionEventViewProps = {
  onMotionEvent?: (event: { nativeEvent: MotionEventPayload }) => void;
  targetFPS?: number;
} & ViewProps;
