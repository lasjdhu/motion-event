package expo.modules.motionevent

import android.os.SystemClock
import android.util.Log
import android.view.MotionEvent
import android.view.VelocityTracker
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MotionEventModule : Module() {
  private var velocityTracker: VelocityTracker? = null
  private var targetFPS: Int = 60
  private var lastEventTime: Long = 0
  private var isListening: Boolean = false
  private var originalWindowCallback: android.view.Window.Callback? = null

  override fun definition() = ModuleDefinition {
    Name("MotionEvent")
    Events("onMotionEvent")

    Function("startListening") {
      try {
        if (!isListening) {
          isListening = true
          velocityTracker?.recycle()
          velocityTracker = VelocityTracker.obtain()
          setupTouchEventInterceptor()
          Log.d("MotionEventModule", "Started listening")
        }
        true
      } catch (e: Exception) {
        Log.e("MotionEventModule", "Error starting listener", e)
        false
      }
    }

    Function("stopListening") {
      try {
        isListening = false
        velocityTracker?.recycle()
        velocityTracker = null
        restoreOriginalWindowCallback()
        Log.d("MotionEventModule", "Stopped listening")
        true
      } catch (e: Exception) {
        Log.e("MotionEventModule", "Error stopping listener", e)
        false
      }
    }

    Function("setTargetFPS") { fps: Int ->
      try {
        targetFPS = fps.coerceIn(1, 120)
        Log.d("MotionEventModule", "Set FPS to $targetFPS")
        true
      } catch (e: Exception) {
        Log.e("MotionEventModule", "Error setting FPS", e)
        false
      }
    }

    OnDestroy {
      restoreOriginalWindowCallback()
      velocityTracker?.recycle()
      velocityTracker = null
      isListening = false
    }
  }

  private fun setupTouchEventInterceptor() {
    try {
      appContext.activityProvider?.currentActivity?.runOnUiThread {
        appContext.activityProvider?.currentActivity?.let { activity ->
          val window = activity.window
          originalWindowCallback = window.callback
          window.callback = object : android.view.Window.Callback by originalWindowCallback!! {
            override fun dispatchTouchEvent(event: MotionEvent): Boolean {
              if (isListening) {
                handleTouchEvent(event)
              }
              return originalWindowCallback?.dispatchTouchEvent(event) ?: false
            }
          }
        }
      }
    } catch (e: Exception) {
      Log.e("MotionEventModule", "Error setting up touch interceptor", e)
    }
  }

  private fun restoreOriginalWindowCallback() {
    try {
      appContext.activityProvider?.currentActivity?.runOnUiThread {
        appContext.activityProvider?.currentActivity?.let { activity ->
          activity.window.callback = originalWindowCallback ?: activity.window.callback
          originalWindowCallback = null
        }
      }
    } catch (e: Exception) {
      Log.e("MotionEventModule", "Error restoring original window callback", e)
    }
  }

  private fun handleTouchEvent(event: MotionEvent) {
    if (!isListening) return

    val currentTime = SystemClock.uptimeMillis()
    val frameInterval = 1000 / targetFPS

    if (currentTime - lastEventTime >= frameInterval) {
      lastEventTime = currentTime

      try {
        velocityTracker?.addMovement(event)
        velocityTracker?.computeCurrentVelocity(1000)

        val eventData = createEventData(event)
        sendEvent("onMotionEvent", eventData)
        Log.d("MotionEventModule", "Event sent: action=${event.action}, x=${event.x}, y=${event.y}")
      } catch (e: Exception) {
        Log.e("MotionEventModule", "Error processing motion event", e)
      }
    }
  }

  private fun createEventData(event: MotionEvent): Map<String, Any> {
    return try {
      val pointerCount = event.pointerCount
      val pointerCoords = mutableListOf<Map<String, Any>>()
      val pointerProperties = mutableListOf<Map<String, Any>>()

      for (i in 0 until pointerCount) {
        val coords = MotionEvent.PointerCoords()
        val props = MotionEvent.PointerProperties()

        event.getPointerCoords(i, coords)
        event.getPointerProperties(i, props)

        pointerCoords.add(
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
        )

        pointerProperties.add(
          mapOf(
            "id" to props.id,
            "toolType" to props.toolType
          )
        )
      }

      mapOf(
        "action" to event.action,
        "actionMasked" to event.actionMasked,
        "actionIndex" to event.actionIndex,
        "eventTime" to event.eventTime,
        "downTime" to event.downTime,
        "edgeFlags" to event.edgeFlags,
        "deviceId" to event.deviceId,
        "source" to event.source,
        "pointerCount" to pointerCount,
        "pointerCoords" to pointerCoords,
        "pointerProperties" to pointerProperties,
        "rawX" to event.rawX,
        "rawY" to event.rawY,
        "xPrecision" to event.xPrecision,
        "yPrecision" to event.yPrecision,
        "velocityX" to (velocityTracker?.xVelocity ?: 0f),
        "velocityY" to (velocityTracker?.yVelocity ?: 0f),
        "fps" to targetFPS
      )
    } catch (e: Exception) {
      Log.e("MotionEventModule", "Error creating event data", e)
      mapOf(
        "error" to "Failed to create event data: ${e.message}",
        "action" to event.action,
        "x" to event.x,
        "y" to event.y
      )
    }
  }
}

