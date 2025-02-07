package expo.modules.motionevent

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MotionEventModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("MotionEvent")

    Events("onMotionEvent")

    View(MotionEventView::class) {
      Events("onMotionEvent")

      Prop("targetFPS") { view: MotionEventView, value: Int ->
        view.setTargetFPS(value)
      }
    }
  }
}

