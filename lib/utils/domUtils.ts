import {getTopLevelWindow} from './windowUtils';

export function getDocument(wdw: Window): Document {
  try {
    return wdw.document || (<HTMLIFrameElement>(<any>wdw)).contentDocument;
  } catch (e) {
  }
}

export function getIFrameRecursive(wdw: Window): HTMLIFrameElement[] {
  let iframes: HTMLIFrameElement[] = [];
  const doc: Document = getDocument(wdw);
  if (!doc) {
    return iframes;
  }
  const childIframes: HTMLIFrameElement[] = [].slice.call(doc.getElementsByTagName('iframe'));
  iframes = iframes.concat(childIframes);
  childIframes.forEach(child => {
    iframes = iframes.concat(getIFrameRecursive(child.contentWindow));
  });
  return iframes.filter(frm => {
    try {
      frm.contentDocument.body + ''; // access to same origin only content
      return true;
    } catch (e) {
      // ignore other origin iframe
    }
    return false;
  });
}

export function getDocumentsRecursive(wdw: Window): Document[] {
  const iframes = getIFrameRecursive(wdw);
  const documents = [getDocument(wdw)]
    .concat(iframes.map(frm => getDocument(frm.contentWindow)))
    .filter(element => !!element);
  return documents;
}

export function ready(callback: Function): void {
  const wdw = getTopLevelWindow();
  const doc = getDocument(wdw);
  if (doc.readyState === 'complete' || (doc.readyState !== 'loading' && !(<any>doc.documentElement)['doScroll']))
    setTimeout(() => callback(), 0);
  else {
    const _callback = function() {
      doc.removeEventListener('DOMContentLoaded', _callback, false);
      wdw.removeEventListener('load', _callback, false);
      callback();
    }
    doc.addEventListener('DOMContentLoaded', _callback, false);
    wdw.addEventListener('load', _callback, false);
  }
}
