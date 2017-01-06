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
  fetch(options: any[]) {
    // config detection
    // fetch
    // emit data
    this.store.emit('update', {});
  }
}
