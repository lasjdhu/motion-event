package expo.modules.motionevent

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MotionEventModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("MotionEvent")

    Events("onMotionEvent", "onGestureEvent")

    View(MotionEventView::class) {
      Events("onMotionEvent", "onGestureEvent")

      Prop(name = "targetFPS") { view, value: Int ->
        view.setTargetFPS(value)
      }
    }
  }
}
