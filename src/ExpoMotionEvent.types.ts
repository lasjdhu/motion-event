import { EventSubscription } from "react-native";

export interface ExpoMotionEventCoords {
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

export interface ExpoMotionEventProperties {
  id: number;
  toolType: number;
}

export interface ExpoMotionEvent {
  action: number;
  actionMasked: number;
  actionIndex: number;
  eventTime: number;
  downTime: number;
  edgeFlags: number;
  deviceId: number;
  source: number;
  pointerCount: number;
  pointerCoords: ExpoMotionEventCoords[];
  pointerProperties: ExpoMotionEventProperties[];
  rawX: number;
  rawY: number;
  xPrecision: number;
  yPrecision: number;
  velocityX: number;
  velocityY: number;
  fps: number;
}

export type ExpoMotionEventName = "onExpoMotionEvent";

export type ExpoMotionEventListener = (event: ExpoMotionEvent) => void;

export interface ExpoMotionEventModule {
  startListening(): void;
  stopListening(): void;
  setTargetFPS(fps: number): void;
  addListener(
    eventName: ExpoMotionEventName,
    listener: ExpoMotionEventListener,
  ): EventSubscription;
}
