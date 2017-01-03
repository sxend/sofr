import {Store} from "./store";
import {Model} from "./model";
import {Configuration} from "./configuration";
import {getTopLevelWindow} from './utils/windowUtils';
import {getDocumentsRecursive} from './utils/domUtils';

export class Front {
  private config: Configuration;
  private model: Model;
  private store: Store;
  private elements: {[id: string]: Element} = {};

  initialize(config: Configuration, model: Model, store: Store) {
    this.config = config;
    this.model = model;
    this.store = store;
    this.scanLoop();
  }
  private scanLoop() {
    setInterval(() => { //tentative impl
      const documents = getDocumentsRecursive(getTopLevelWindow(window));
      documents.forEach(doc => {
        let elements = [].slice.call(doc.querySelectorAll(this.config.selector));
        elements.forEach((el: Element) => {
          if (!el.getAttribute("data-sofr-id")) {
            return;
          }
          let id = Date.now().toString(32) + Math.random().toString(32).substring(2);
          el.setAttribute("data-sofr-id", id);
          this.elements[id] = el;
          this.model.notify(id, el);
        });
      });
    }, 300);
  }
  render(id: string, data: any) {
    this.elements[id]
  }
}
