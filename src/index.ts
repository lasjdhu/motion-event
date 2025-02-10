import { EventSubscription } from "expo-modules-core";

import {
  ExpoMotionEvent,
  ExpoMotionEventListener,
  ExpoMotionEventName,
  ExpoMotionEventCoords,
  ExpoMotionEventProperties,
} from "./ExpoMotionEvent.types";
import ExpoMotionEventModule from "./ExpoMotionEventModule";

export function startListening(): void {
  ExpoMotionEventModule.startListening();
}

export function stopListening(): void {
  ExpoMotionEventModule.stopListening();
}

export function setTargetFPS(fps: number): void {
  ExpoMotionEventModule.setTargetFPS(fps);
}

export function addExpoMotionEventListener(
  listener: ExpoMotionEventListener,
): EventSubscription {
  return ExpoMotionEventModule.addListener("onExpoMotionEvent", listener);
}

export type {
  ExpoMotionEvent,
  ExpoMotionEventCoords,
  ExpoMotionEventProperties,
  ExpoMotionEventListener,
  ExpoMotionEventName,
  EventSubscription,
};
