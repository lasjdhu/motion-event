import { EventSubscription } from "expo-modules-core";

import {
  ExpoMotionEvent,
  ExpoMotionEventListener,
  ExpoMotionEventName,
  ExpoMotionEventCoords,
  ExpoMotionEventProperties,
  MotionEventActions,
  ToolTypes,
  ExpoMotionEventError,
  ExpoMotionEventResult,
} from "./ExpoMotionEvent.types";
import ExpoMotionEventModule from "./ExpoMotionEventModule";

export function startListening(): void {
  try {
    ExpoMotionEventModule.startListening();
  } catch (error) {
    console.error("Failed to start listening:", error);
  }
}

export function stopListening(): void {
  try {
    ExpoMotionEventModule.stopListening();
  } catch (error) {
    console.error("Failed to stop listening:", error);
  }
}

export function setTargetFPS(fps: number): void {
  ExpoMotionEventModule.setTargetFPS(fps);
}

export function addExpoMotionEventListener(
  listener: ExpoMotionEventListener,
): EventSubscription {
  return ExpoMotionEventModule.addListener("onExpoMotionEvent", listener);
}

export { MotionEventActions, ToolTypes };
export type {
  ExpoMotionEvent,
  ExpoMotionEventCoords,
  ExpoMotionEventProperties,
  ExpoMotionEventListener,
  ExpoMotionEventName,
  ExpoMotionEventError,
  ExpoMotionEventResult,
  EventSubscription,
};
