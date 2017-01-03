import {Front} from './front';
import {Model} from "./model";
import {Store} from "./store";
import {Configuration} from "./configuration";
import {getTopLevelWindow} from './utils/windowUtils';
import {getDocumentsRecursive} from './utils/domUtils';


const wdw: any = <any>getTopLevelWindow(window);
const cache = {
  configs: <Configuration[]>[]
};
export const sofr = {
  init: function() {
    wdw["sofr"] = wdw["sofr"] || sofr;
    // set local scope method
    // FOO.bar = FOO.bar || sofr;
  },
  main: function(config: Configuration) {
    if(cache.configs.filter((c) => c.id === config.id).length > 0) {
      // already executed
      // config diff
      return;
    }
    const documents = getDocumentsRecursive(wdw);
    const front = new Front();
    const model = new Model();
    const store = new Store();
    front.initialize(config, model, store);
    model.initialize(config, front, store);
    store.initialize(config, front, model);
  }
};
function singleton<A>(a: () => A): () => A {
  let instance: A = null;
  return () => {
    if (!instance) {
      instance = a();
    }
    return instance;
  }
}
