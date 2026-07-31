import { requireNativeModule } from "expo-modules-core";

import { MotionEventModule } from "./MotionEvent.types";

export default requireNativeModule<MotionEventModule>("MotionEvent");
