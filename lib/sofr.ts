import {Configuration} from "./configuration";
import {getTopLevelWindow} from './utils/windowUtils';
import {getDocumentsRecursive} from './utils/domUtils';

const cache = {
  configs: <Configuration[]>[]
};
export const sofr = {
  main: function(config: Configuration) {
    if(cache.configs.filter((c) => c.id === config.id).length > 0) {
      // already executed
      // config diff
      return;
    }
    const topLevelWindow: Window = getTopLevelWindow(window);
    const documents = getDocumentsRecursive(topLevelWindow);
  }
};
