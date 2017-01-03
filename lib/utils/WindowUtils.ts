export function getTopLevelWindow(target: Window, maxAttempts: number = 5): Window {
    var top = target;
    var counter = 0;
    while (top !== top.parent) {
      if (counter > maxAttempts) {
        break;
      }
      counter++;
      try {
        if (
          (top.parent.location.protocol === top.location.protocol &&
          top.parent.location.hostname === top.location.hostname &&
          top.parent.location.port === top.location.port) || top.location.protocol === "about:"
        ) {
          top = top.parent;
        }
      } catch (e) {
        break;
      }
    }
    return top;
  }
