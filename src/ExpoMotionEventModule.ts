import { requireNativeModule } from "expo-modules-core";

import { ExpoMotionEventModule } from "./ExpoMotionEvent.types";

export default requireNativeModule<ExpoMotionEventModule>("ExpoMotionEvent");
