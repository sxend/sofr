
export function getDocument(wdw: Window): Document {
  try {
    return wdw.document || (<HTMLIFrameElement>(<any>wdw)).contentDocument;
  } catch (e) {
  }
}

export function getIFrameRecursive(wdw: Window): HTMLIFrameElement[] {
  let result: HTMLIFrameElement[] = [];
  const doc: Document = getDocument(wdw);
  if (!doc) {
    return result;
  }
  const children: HTMLIFrameElement[] = [].slice.call(doc.getElementsByTagName('iframe'));
  result = result.concat(children);
  children.forEach(child => {
    result = result.concat(getIFrameRecursive(child.contentWindow));
  });
  return result.filter(frm => {
    try {
      frm.contentDocument.body + ""; // access to same origin only content
      return true;
    } catch(e) {
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
