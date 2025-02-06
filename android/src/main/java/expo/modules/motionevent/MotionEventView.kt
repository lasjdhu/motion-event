package expo.modules.motionevent

import android.content.Context
import android.view.GestureDetector
import android.view.MotionEvent
import android.view.VelocityTracker
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import kotlin.math.hypot

class MotionEventView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val onMotionEvent by EventDispatcher()
  private val onGestureEvent by EventDispatcher()
  private val velocityTracker = VelocityTracker.obtain()
  private val gestureDetector: GestureDetector

  private var targetFPS: Int = 60
  private var lastEventTime: Long = 0
 
  init {
    isFocusable = true
    isClickable = true
    setLayerType(LAYER_TYPE_HARDWARE, null)

    gestureDetector = GestureDetector(context, GestureListener())
  }

  fun setTargetFPS(fps: Int) {
    targetFPS = fps.coerceAtLeast(1)
  }

  override fun onTouchEvent(event: MotionEvent): Boolean {
    val currentTime = System.currentTimeMillis()
    val frameInterval = 1000 / targetFPS

    if (currentTime - lastEventTime >= frameInterval) {
      lastEventTime = currentTime
      velocityTracker.addMovement(event)
      velocityTracker.computeCurrentVelocity(1000)
      onMotionEvent(createEventData(event))
    }

    return gestureDetector.onTouchEvent(event) || super.onTouchEvent(event)
  }

  private inner class GestureListener : GestureDetector.SimpleOnGestureListener() {
    override fun onSingleTapConfirmed(e: MotionEvent): Boolean {
      onGestureEvent(mapOf("type" to "tap", "x" to e.x, "y" to e.y))
      return true
    }

    override fun onLongPress(e: MotionEvent) {
      onGestureEvent(mapOf("type" to "longPress", "x" to e.x, "y" to e.y))
    }

    override fun onScroll(e1: MotionEvent?, e2: MotionEvent, distanceX: Float, distanceY: Float): Boolean {
      onGestureEvent(mapOf("type" to "scroll", "dx" to distanceX, "dy" to distanceY))
      return true
    }

    override fun onFling(e1: MotionEvent?, e2: MotionEvent, velocityX: Float, velocityY: Float): Boolean {
      val direction = when {
        kotlin.math.abs(velocityX) > kotlin.math.abs(velocityY) -> if (velocityX > 0) "right" else "left"
        else -> if (velocityY > 0) "down" else "up"
      }
      onGestureEvent(
        mapOf(
          "type" to "swipe",
          "direction" to direction,
          "velocity" to hypot(velocityX, velocityY)
        )
      )
      return true
    }
  }

  private fun createEventData(event: MotionEvent): Map<String, Any> = mapOf(
    "action" to event.action,
    "x" to event.x,
    "y" to event.y,
    "pressure" to event.pressure,
    "pointerCount" to event.pointerCount,
    "velocityX" to velocityTracker.xVelocity,
    "velocityY" to velocityTracker.yVelocity,
    "timestamp" to System.currentTimeMillis(),
    "toolType" to event.getToolType(0),
    "orientation" to event.getAxisValue(MotionEvent.AXIS_ORIENTATION),
    "tilt" to event.getAxisValue(MotionEvent.AXIS_TILT),
    "fps" to targetFPS
  )

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    velocityTracker.recycle()
  }
}

