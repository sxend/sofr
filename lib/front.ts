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
    // prerender
    this.model.found(foundElements);
  }
  preRender(id: string, data: any) {
  }
  render(id: string, data: any) {
  }
}
function genid() {
  return Date.now().toString(32) + Math.random().toString(32).substring(2);
}
