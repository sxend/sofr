import {Store} from "./store";
import {Model} from "./model";
import {Configuration} from "./configuration";


export class Front {
  private config: Configuration;
  private model: Model;
  private store: Store;
  initialize(config: Configuration, model: Model, store: Store) {
    this.config = config;
    this.model = model;
    this.store = store;
  }
  private scanLoop() {
    setInterval(() => { //tentative impl
      this.model.notify("id", document.querySelector('body'));
    }, 300);
  }
  render(id: string, data: any) {
    console.log('render');
  }
}
