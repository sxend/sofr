
let __TopLevelWindow: Window = null;

export function getTopLevelWindow(wdw: Window = window) {
  if (!__TopLevelWindow) {
    __TopLevelWindow = getTopLevelWindowWithCount(wdw);
  }
  return __TopLevelWindow;
}

function getTopLevelWindowWithCount(wdw: Window, count: number = 0): Window {

  if (wdw === wdw.parent) {
    return wdw;
  }
  try {
    const isSameProtocol = wdw.parent.location.protocol === wdw.location.protocol;
    const isSameHostname = wdw.parent.location.hostname === wdw.location.hostname;
    const isSamePort = wdw.parent.location.port === wdw.location.port;
    const isBlankPage = wdw.location.protocol === 'about:';
    if (
      (isSameProtocol && isSameHostname && isSamePort) || isBlankPage
    ) {
      wdw = wdw.parent;
      if (count < 5) {
        wdw = getTopLevelWindowWithCount(wdw.parent, count + 1);
      }
    }
  } catch (e) {
  }
  return wdw;
}
