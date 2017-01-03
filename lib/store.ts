import {Model} from "./model";
import {Front} from "./front";
import {Configuration} from "./configuration";

export class Store {
  private config: Configuration;
  private front: Front;
  private model: Model;
  initialize(config: Configuration, front: Front, model: Model) {
    this.config = config;
    this.front = front;
    this.model = model;
  }
}
