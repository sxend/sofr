import {Store} from "./store";
import {Front} from "./front";
import {Configuration} from "./configuration";

export class Model {
  private config: Configuration;
  private front: Front;
  private store: Store;
  initialize(config: Configuration, front: Front, store: Store) {
    this.config = config;
    this.front = front;
    this.store = store;
  }
  notify(id: string, data: any) {
    this.store.newData(id, {});
  }
}
