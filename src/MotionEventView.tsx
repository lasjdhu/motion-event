import { requireNativeView } from 'expo';
import * as React from 'react';

import { MotionEventViewProps } from './MotionEvent.types';

const NativeView: React.ComponentType<MotionEventViewProps> =
  requireNativeView('MotionEvent');

export default function MotionEventView(props: MotionEventViewProps) {
  return <NativeView {...props} />;
}
