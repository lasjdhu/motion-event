import { EventSubscription } from "expo-modules-core";

export const MotionEventActions = {
  DOWN: 0,
  UP: 1,
  MOVE: 2,
  CANCEL: 3,
  POINTER_DOWN: 5,
  POINTER_UP: 6,
} as const;

export const ToolTypes = {
  FINGER: 1,
  STYLUS: 2,
  MOUSE: 3,
  ERASER: 4,
} as const;

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

export interface ExpoMotionEventError {
  code: string;
  message: string;
  details?: any;
}

export type ExpoMotionEventResult =
  | { type: "success"; data: ExpoMotionEvent }
  | { type: "error"; error: ExpoMotionEventError };

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
