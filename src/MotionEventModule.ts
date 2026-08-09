import { requireNativeModule } from "expo-modules-core";

import type { MotionEventModule } from "./MotionEvent.types";

export default requireNativeModule<MotionEventModule>("MotionEvent");
