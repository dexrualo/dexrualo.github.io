# Palette's Journal

## 2023-11-23 - Dynamic Navigation State & Standard Accessibility

**Learning:** Static navigation attributes (like `aria-current="page"` defined solely in the HTML template) can easily go out of sync when navigation is handled dynamically via JavaScript scroll listener or click handlers. By synchronizing the `aria-current` attribute alongside visual `.active` class toggle, we ensure screen reader users receive correct context about the current viewport.

**Action:** Always pair visual active classes with assistive technology attributes (e.g., `aria-current="page"`) dynamically when building custom scrolling or dynamic state changes.
