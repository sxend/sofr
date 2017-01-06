import {Store} from "./store";
import {Model} from "./model";
import {Configuration} from "./configuration";
import {getTopLevelWindow} from './utils/windowUtils';
import {getDocumentsRecursive, ready} from './utils/domUtils';

export class Front {
  private config: Configuration;
  private model: Model;
  private store: Store;

  initialize(config: Configuration, model: Model, store: Store) {
    this.config = config;
    this.model = model;
    this.store = store;
    this.store.on('update', (data: any[]) => {
      const documents = getDocumentsRecursive(getTopLevelWindow());
      const el = document.querySelector('[data-sofr-id=' + data[0].id + ']');
      if (data[0].disabled) {
        el && el.remove();
      } else {
        this.render(el, data[0]);
      }
    });
  }

  private scan() {
    const documents = getDocumentsRecursive(getTopLevelWindow());
    const foundElements: Element[] = [];
    documents.forEach(doc => {
      const elements = [].slice.call(doc.querySelectorAll(this.config.selector));
      elements.forEach((el: Element) => {
        if (el.getAttribute("data-sofr-id")) {
          return;
        }
        el.setAttribute("data-sofr-id", genid());
        foundElements.push(el);
      });
    });
    if (foundElements.length == 0) {
      return;
    }
    // prerender
    if (this.config.enabledPreRender) {
      this.preRender(foundElements); // async?
    }
    this.model.fetch([{
      id: "genid",
      imp: [{
        id: 1,
        w: 10,
        h: 9
      }],
      ext: {
        tagid: "10000"
      }
    }]);
  }
  private preRender(elements: Element[]) {
  }
  private render(el: Element, data: any[]) {
  }
}
function genid() {
  return Date.now().toString(32) + Math.random().toString(32).substring(2);
}
