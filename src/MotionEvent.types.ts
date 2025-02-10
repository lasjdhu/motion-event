import { EventSubscription } from "react-native";

export interface MotionEventCoords {
  orientation: number;
  pressure: number;
  size: number;
  toolMajor: number;
  toolMinor: number;
  touchMajor: number;
  touchMinor: number;
  x: number;
  y: number;
}

export interface MotionEventProperties {
  id: number;
  toolType: number;
}

export interface MotionEvent {
  action: number;
  actionMasked: number;
  actionIndex: number;
  eventTime: number;
  downTime: number;
  edgeFlags: number;
  deviceId: number;
  source: number;
  pointerCount: number;
  pointerCoords: MotionEventCoords[];
  pointerProperties: MotionEventProperties[];
  rawX: number;
  rawY: number;
  xPrecision: number;
  yPrecision: number;
  velocityX: number;
  velocityY: number;
  fps: number;
}

export type MotionEventName = "onMotionEvent";

export type MotionEventListener = (event: MotionEvent) => void;

export interface MotionEventModule {
  startListening(): void;
  stopListening(): void;
  setTargetFPS(fps: number): void;
  addListener(
    eventName: MotionEventName,
    // eslint-disable-next-line prettier/prettier
    listener: MotionEventListener
  ): EventSubscription;
}
