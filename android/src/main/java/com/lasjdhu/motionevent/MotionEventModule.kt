package com.lasjdhu.motionevent

import android.os.SystemClock
import android.util.Log
import android.view.MotionEvent
import android.view.VelocityTracker
import android.view.Window
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MotionEventModule : Module() {
  private var velocityTracker: VelocityTracker? = null
  private var targetFPS: Int = 60
  private var lastEventTime: Long = 0
  private var isListening: Boolean = false
  private var interceptedWindow: Window? = null
  private var originalWindowCallback: Window.Callback? = null
  private var interceptorCallback: Window.Callback? = null

  private val tempPointerCoords = MotionEvent.PointerCoords()
  private val tempPointerProps = MotionEvent.PointerProperties()

  override fun definition() = ModuleDefinition {
    Name("MotionEvent")
    Events("onMotionEvent")

    Function("startListening") { targetFps: Int ->
      targetFPS = targetFps.coerceIn(1, 120)
      if (!isListening) {
        velocityTracker?.clear() ?: run { velocityTracker = VelocityTracker.obtain() }
        lastEventTime = 0
        isListening = setupTouchEventInterceptor()
      }
      isListening
    }

    Function("stopListening") {
      isListening = false
      velocityTracker?.clear()
      restoreOriginalWindowCallback()
      true
    }

    OnDestroy {
      restoreOriginalWindowCallback()
      velocityTracker?.clear()
      velocityTracker?.recycle()
      velocityTracker = null
      isListening = false
    }
  }

  private fun setupTouchEventInterceptor(): Boolean {
    val activity = appContext.activityProvider?.currentActivity ?: return false
    val window = activity.window
    val callback = window.callback
    val interceptor = object : Window.Callback by callback {
      override fun dispatchTouchEvent(event: MotionEvent): Boolean {
        if (isListening) {
          handleTouchEvent(event)
        }
        return callback.dispatchTouchEvent(event)
      }
    }
    interceptedWindow = window
    originalWindowCallback = callback
    interceptorCallback = interceptor
    window.callback = interceptor
    return true
  }

  private fun restoreOriginalWindowCallback() {
    val window = interceptedWindow
    if (window != null && window.callback === interceptorCallback) {
      originalWindowCallback?.let { window.callback = it }
    }
    interceptedWindow = null
    originalWindowCallback = null
    interceptorCallback = null
  }

  private fun handleTouchEvent(event: MotionEvent) {
    if (!isListening) return

    if (event.actionMasked == MotionEvent.ACTION_DOWN) {
      velocityTracker?.clear()
    }
    velocityTracker?.apply {
      addMovement(event)
      computeCurrentVelocity(1000)
    }

    val currentTime = SystemClock.uptimeMillis()
    val frameInterval = 1000L / targetFPS
    val isMove = event.actionMasked == MotionEvent.ACTION_MOVE

    if (!isMove || currentTime - lastEventTime >= frameInterval) {
      lastEventTime = currentTime
      val eventData = createEventData(event)
      sendEvent("onMotionEvent", eventData)
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
        "targetFps" to targetFPS
      )
    } catch (e: Exception) {
      Log.e("MotionEventModule", "Error creating event data", e)
      throw e
    }
  }
}
