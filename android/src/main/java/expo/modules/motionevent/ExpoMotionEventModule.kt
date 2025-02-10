package expo.modules.motionevent

import android.os.SystemClock
import android.util.Log
import android.view.MotionEvent
import android.view.VelocityTracker
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoMotionEventModule : Module() {
  private var velocityTracker: VelocityTracker? = null
  private var targetFPS: Int = 60
  private var lastEventTime: Long = 0
  private var isListening: Boolean = false
  private var originalWindowCallback: android.view.Window.Callback? = null

  private val tempPointerCoords = MotionEvent.PointerCoords()
  private val tempPointerProps = MotionEvent.PointerProperties()

  override fun definition() = ModuleDefinition {
    Name("ExpoMotionEvent")
    Events("onExpoMotionEvent")

    Function("startListening") {
      if (!isListening) {
        isListening = true
        velocityTracker?.clear() ?: run { velocityTracker = VelocityTracker.obtain() }
        setupTouchEventInterceptor()
      }
      true
    }

    Function("stopListening") {
      isListening = false
      velocityTracker?.clear()
      restoreOriginalWindowCallback()
      true
    }

    Function("setTargetFPS") { fps: Int ->
      targetFPS = fps.coerceIn(1, 120)
      true
    }

    OnDestroy {
      restoreOriginalWindowCallback()
      velocityTracker?.clear()
      isListening = false
    }
  }

  private fun setupTouchEventInterceptor() {
    val activity = appContext.activityProvider?.currentActivity ?: return
    val window = activity.window
    originalWindowCallback = window.callback
    originalWindowCallback?.let { callback ->
      window.callback = object : android.view.Window.Callback by callback {
        override fun dispatchTouchEvent(event: MotionEvent): Boolean {
          if (isListening) {
            handleTouchEvent(event)
          }
          return callback.dispatchTouchEvent(event)
        }
      }
    }
  }

  private fun restoreOriginalWindowCallback() {
    val activity = appContext.activityProvider?.currentActivity ?: return
    activity.window.callback = originalWindowCallback ?: activity.window.callback
    originalWindowCallback = null
  }

  private fun handleTouchEvent(event: MotionEvent) {
    if (!isListening) return

    val currentTime = SystemClock.uptimeMillis()
    val frameInterval = 1000 / targetFPS

    if (currentTime - lastEventTime >= frameInterval) {
      lastEventTime = currentTime

      velocityTracker?.apply {
        addMovement(event)
        computeCurrentVelocity(1000)
      }

      val eventData = createEventData(event)
      sendEvent("onExpoMotionEvent", eventData)
    }
  }

  private fun createEventData(event: MotionEvent): Map<String, Any> {
    return try {
      val pointerCount = event.pointerCount
      val pointerCoords = mutableListOf<Map<String, Any>>()
      val pointerProperties = mutableListOf<Map<String, Any>>()

      for (i in 0 until pointerCount) {
        event.getPointerCoords(i, tempPointerCoords)
        event.getPointerProperties(i, tempPointerProps)

        pointerCoords.add(
          mapOf(
            "orientation" to tempPointerCoords.orientation,
            "pressure" to tempPointerCoords.pressure,
            "size" to tempPointerCoords.size,
            "toolMajor" to tempPointerCoords.toolMajor,
            "toolMinor" to tempPointerCoords.toolMinor,
            "touchMajor" to tempPointerCoords.touchMajor,
            "touchMinor" to tempPointerCoords.touchMinor,
            "x" to tempPointerCoords.x,
            "y" to tempPointerCoords.y
          )
        )

        pointerProperties.add(
          mapOf(
            "id" to tempPointerProps.id,
            "toolType" to tempPointerProps.toolType
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
      Log.e("ExpoMotionEventModule", "Error creating event data", e)
      mapOf(
        "error" to "Failed to create event data: ${e.message}",
        "action" to event.action,
        "x" to event.x,
        "y" to event.y
      )
    }
  }
}

