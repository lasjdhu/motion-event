package expo.modules.motionevent

import android.content.Context
import android.view.MotionEvent
import android.view.View
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

class MotionEventView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val onMotionEvent by EventDispatcher()

  init {
    isFocusable = true
    isClickable = true
  }

  override fun onTouchEvent(event: MotionEvent): Boolean {
    val eventData = mapOf(
      "action" to event.action,
      "x" to event.x,
      "y" to event.y,
      "pressure" to event.pressure,
      "pointerCount" to event.pointerCount
    )

    onMotionEvent(eventData)
    return true
  }
}

