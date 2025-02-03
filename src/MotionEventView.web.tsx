import * as React from 'react';

import { MotionEventViewProps } from './MotionEvent.types';

export default function MotionEventView(props: MotionEventViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
