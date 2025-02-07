package expo.modules.motionevent

import android.content.Context
import android.view.MotionEvent
import android.view.VelocityTracker
import android.view.View
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

class MotionEventView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val onMotionEvent by EventDispatcher()
  private val velocityTracker = VelocityTracker.obtain()
  private var targetFPS: Int = 60
  private var lastEventTime: Long = 0

  init {
    val touchView = View(context).also {
      it.layoutParams = LayoutParams(
        LayoutParams.MATCH_PARENT,
        LayoutParams.MATCH_PARENT
      )
      it.setOnTouchListener { _, event ->
        // Handle touch event here but don't intercept it if it's meant for child views
        handleTouchEvent(event)
        false
      }
    }

    addView(touchView)
  }

  fun setTargetFPS(fps: Int) {
    targetFPS = fps.coerceAtLeast(1)
  }

  private fun handleTouchEvent(event: MotionEvent) {
    val currentTime = System.currentTimeMillis()
    val frameInterval = 1000 / targetFPS

    if (currentTime - lastEventTime >= frameInterval) {
      lastEventTime = currentTime
      velocityTracker.addMovement(event)
      velocityTracker.computeCurrentVelocity(1000)
      onMotionEvent(createEventData(event))
    }
  }

  private fun createEventData(event: MotionEvent): Map<String, Any> {
    val pointerCount = event.pointerCount
    val pointerProperties = Array(pointerCount) { MotionEvent.PointerProperties() }
    val pointerCoords = Array(pointerCount) { MotionEvent.PointerCoords() }

    for (i in 0 until pointerCount) {
      event.getPointerProperties(i, pointerProperties[i])
      event.getPointerCoords(i, pointerCoords[i])
    }

    return mapOf(
      "action" to event.action,
      "actionMasked" to event.actionMasked,
      "actionIndex" to event.actionIndex,
      "eventTime" to event.eventTime,
      "downTime" to event.downTime,
      "edgeFlags" to event.edgeFlags,
      "deviceId" to event.deviceId,
      "source" to event.source,
      "pointerCount" to pointerCount,
      "pointerCoords" to pointerCoords.map { coords ->
        mapOf(
          "orientation" to coords.orientation,
          "pressure" to coords.pressure,
          "size" to coords.size,
          "toolMajor" to coords.toolMajor,
          "toolMinor" to coords.toolMinor,
          "touchMajor" to coords.touchMajor,
          "touchMinor" to coords.touchMinor,
          "x" to coords.x,
          "y" to coords.y
        )
      },
      "pointerProperties" to pointerProperties.map { props ->
        mapOf(
          "id" to props.id,
          "toolType" to props.toolType
        )
      },
      "rawX" to event.rawX,
      "rawY" to event.rawY,
      "xPrecision" to event.xPrecision,
      "yPrecision" to event.yPrecision,
      "velocityX" to velocityTracker.xVelocity,
      "velocityY" to velocityTracker.yVelocity,
      "fps" to targetFPS
    )
  }

  // Override dispatchTouchEvent to allow child views to handle touch events
  override fun dispatchTouchEvent(event: MotionEvent?): Boolean {
    parent.requestDisallowInterceptTouchEvent(true)
    handleTouchEvent(event!!)
    return super.dispatchTouchEvent(event)
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    velocityTracker.recycle()
  }
}

