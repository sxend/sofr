import {Model} from "./model";
import {Front} from "./front";
import {Configuration} from "./configuration";

export class Store {
  private _callback: { [name: string]: Function[] } = {};
  private config: Configuration;
  private front: Front;
  private model: Model;
  initialize(config: Configuration, front: Front, model: Model) {
    this.config = config;
    this.front = front;
    this.model = model;
  }
  emit(name: string, payload?: any) {
    (this._callback[name] = this._callback[name] || []).forEach(callback => {
      try {
        callback(payload);
      } catch (e) {
        console.warn(e);
      }
    });
  }
  on(name: string, callback: Function) {
    (this._callback[name] = this._callback[name] || []).push(callback);
  }
}
